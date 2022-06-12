import { ActivatedRoute, Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Component, type OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    type Fahrzeug,
    FahrzeugReadService,
    FahrzeugWriteService,
    type Fahrzeugtyp,
    FindError,
    UpdateError,
} from '../shared';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { first, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * component for the tag <code>hs-update-buch</code>
 */
@Component({
    selector: 'hs-update-fahrzeug',
    templateUrl: './update-fahrzeug.component.html',
})
export class UpdateFahrzeugComponent implements OnInit {
    fahrzeug: Fahrzeug | undefined;

    readonly updateForm = new FormGroup({});

    errorMsg: string | undefined;

    // eslint-disable-next-line max-params
    constructor(
        private readonly service: FahrzeugWriteService,
        private readonly readService: FahrzeugReadService,
        private readonly titleService: Title,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
    ) {
        log.debug('UpdateFahrzeugComponent.constructor()');
    }

    ngOnInit() {
        // path params from /fahrzeuge/:id/update
        const id = this.route.snapshot.paramMap.get('id') ?? undefined;

        this.readService
            .findById(id)
            .pipe(
                first(),
                tap(result => {
                    this.#setProps(result);
                    log.debug(
                        'UpdateFahrzeugComponent.ngOnInit: fahrzeug=',
                        this.fahrzeug,
                    );
                }),
            )
            .subscribe();
    }

    /**
     * Write back the recent data for the viewed fahrzeug-object
     * @return false to cancel the event
     */
    onSubmit() {
        if (this.updateForm.pristine || this.fahrzeug === undefined) {
            log.debug('UpdateFahrzeugComponent.onSubmit: keine Änderungen');
            return;
        }

        const { beschreibung } = this.updateForm.value as {
            beschreibung: string;
        };
        const { kennzeichen } = this.updateForm.value as {
            kennzeichen: string;
        };
        const { kilometerstand } = this.updateForm.value as {
            kilometerstand: number;
        };
        const { fahrzeugtype } = this.updateForm.value as {
            fahrzeugtype: Fahrzeugtyp;
        };
        const { vorname } = this.updateForm.value as { vorname: string };
        const { nachname } = this.updateForm.value as { nachname: string };

        const { fahrzeug, service } = this;

        // erstzulassung can't be changed in the form
        fahrzeug.beschreibung = beschreibung;
        fahrzeug.fahrzeugtype = fahrzeugtype;
        fahrzeug.kennzeichen = kennzeichen;
        fahrzeug.kilometerstand = kilometerstand;
        fahrzeug.fahrzeughalter.vorname = vorname;
        fahrzeug.fahrzeughalter.nachname = nachname;

        log.debug('UpdateFahrzeugComponent.onSubmit: fahrzeug=', fahrzeug);

        service
            .update(fahrzeug)
            .pipe(
                first(),
                tap(result => this.#handleUpdateResult(result)),
            )
            .subscribe({ next: () => this.#navigateHome() });

        return false;
    }

    #setProps(result: Fahrzeug | FindError) {
        if (result instanceof FindError) {
            this.#handleFindError(result);
            return;
        }

        this.fahrzeug = result;
        this.errorMsg = undefined;

        const titel = `Aktualisieren ${this.fahrzeug.id}`;
        this.titleService.setTitle(titel);
    }

    #handleFindError(err: FindError) {
        const { statuscode } = err;
        log.debug(
            'UpdateFahrzeugComponent.#handleError: statuscode=',
            statuscode,
        );

        this.fahrzeug = undefined;

        switch (statuscode) {
            case HttpStatusCode.NotFound:
                this.errorMsg = 'Kein Fahrzeug gefunden.';
                break;
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

    #handleUpdateResult(result: Fahrzeug | UpdateError) {
        if (!(result instanceof UpdateError)) {
            return;
        }

        const { statuscode } = result;
        log.debug(
            'UpdateStammdatenComponent.#handleError: statuscode=',
            statuscode,
        );

        switch (statuscode) {
            case HttpStatusCode.UnprocessableEntity: {
                const { cause } = result;
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

        log.debug(
            'UpdateStammdatenComponent.#handleError: errorMsg=',
            this.errorMsg,
        );
    }

    async #navigateHome() {
        await this.router.navigate(['/']);
    }
}
