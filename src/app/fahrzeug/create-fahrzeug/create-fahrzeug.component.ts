import { Component, type OnInit } from '@angular/core';
import { type FahrzeugForm, toFahrzeug } from './fahrzeugForm';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FahrzeugWriteService, SaveError } from '../shared';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { first, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * component for the tag <create-fahrzeug>
 */
@Component({
    selector: 'hs-create-fahrzeug',
    templateUrl: './create-fahrzeug.component.html',
})
export class CreateFahrzeugComponent implements OnInit {
    readonly createForm = new FormGroup({});

    showWarning = false;

    fertig = false;

    errorMsg: string | undefined = undefined;

    constructor(
        private readonly service: FahrzeugWriteService,
        private readonly router: Router,
        private readonly titleService: Title,
    ) {
        log.debug(
            'CreateFahrzeugComponent.constructor: Injizierter Router:',
            router,
        );
    }

    ngOnInit() {
        this.titleService.setTitle('Neues Fahrzeug');
    }

    /**
     * this method realizes the onSubmit event handler for a new Fahrzeug
     * @return false, to cancel the event
     */
    onSubmit() {
        if (this.createForm.invalid) {
            log.debug(
                'CreateFahrzeugComponent.onSave: Validierungsfehler',
                this.createForm,
            );
        }

        const fahrzeugForm = this.createForm.value as FahrzeugForm;
        const neuesFahrzeug = toFahrzeug(fahrzeugForm);
        log.debug(
            'CreateFahrzeugComponent.onSave: neuesFahrzeug=',
            neuesFahrzeug,
        );

        this.service
            .save(neuesFahrzeug)
            .pipe(
                first(),
                tap(result => this.#setProps(result)),
            )
            .subscribe({ next: () => this.#navigateHome() });
    }

    #setProps(result: SaveError | string) {
        if (result instanceof SaveError) {
            this.#handleError(result);
            return;
        }

        this.fertig = true;
        this.showWarning = false;
        this.errorMsg = undefined;

        const id = result;
        log.debug('CreateFahrzeugComponent.#setProps: id=', id);
    }

    #handleError(err: SaveError) {
        const { statuscode } = err;
        log.debug(
            `CreateFahrzeugComponent.#handleError: statuscode=${statuscode}, err=`,
            err,
        );

        switch (statuscode) {
            case HttpStatusCode.UnprocessableEntity: {
                const { cause } = err;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.errorMsg =
                    cause instanceof HttpErrorResponse
                        ? cause.error
                        : JSON.stringify(cause);
                break;
            }

            case HttpStatusCode.TooManyRequests:
                this.errorMsg =
                    'Zu viele Anfragen. Bitte versuchen Sie es später noch einmal.';
                break;

            case HttpStatusCode.GatewayTimeout:
                this.errorMsg = 'Ein interner Fehler ist aufgetreten.';
                log.error('Laeuft der Appserver? Port-Forwarding?');
                break;

            default:
                this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.';
                break;
        }
    }

    async #navigateHome() {
        if (this.errorMsg === undefined) {
            log.debug('CreateFahrzeugComponent.#navigateHome: Navigation');
            await this.router.navigate(['/']);
        }
    }
}
