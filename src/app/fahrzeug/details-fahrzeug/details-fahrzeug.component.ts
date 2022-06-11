import { ActivatedRoute, Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Component, type OnInit } from '@angular/core';
import { type Fahrzeug, FahrzeugReadService } from '../shared'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { first, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { FindError } from '../shared/errors';
import { HttpStatusCode } from '@angular/common/http';
import { type Observable } from 'rxjs';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * component for the tag <code>hs-details-fahrzeug</code>
 */
@Component({
    selector: 'hs-details-fahrzeug',
    templateUrl: './details-fahrzeug.component.html',
    styleUrls: ['./details-fahrzeug.component.scss'],
})
export class DetailsFahrzeugComponent implements OnInit {
    waiting = true;

    fahrzeug: Fahrzeug | undefined;

    errorMsg: string | undefined;

    isAdmin!: boolean;

    appstate$!: Observable<Record<string, unknown> | undefined>;

    // eslint-disable-next-line max-params
    constructor(
        private readonly service: FahrzeugReadService,
        private readonly titleService: Title,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly authService: AuthService,
    ) {
        log.debug('DetailsFahrzeugComponent.constructor()');

        // getCurrentNavigation() returns undefined inside ngOnInit
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras.state as
            | { fahrzeug: Fahrzeug }
            | undefined;
        this.fahrzeug = state?.fahrzeug;
        log.debug(
            'DetailsFahrzeugComponent.constructor: this.fahrzeug=',
            this.fahrzeug,
        );
    }

    ngOnInit() {
        if (this.fahrzeug === undefined) {
            log.debug(
                'DetailsFahrzeugComponent.ngOnInit: this.fahrzeug === undefined',
            );

            // Observe path params without an previous javascrpit event
            // Mongo-ID ia s string
            const id = this.route.snapshot.paramMap.get('id') ?? undefined;
            log.debug('DetailsFahrzeugComponent.ngOnInit: id=', id);

            this.service
                .findById(id)
                .pipe(
                    first(),
                    tap((result: Fahrzeug | FindError) =>
                        this.#setProps(result),
                    ),
                )
                .subscribe();
        } else {
            this.waiting = false;
        }

        this.isAdmin = this.authService.isAdmin;
    }

    #setProps(result: Fahrzeug | FindError) {
        this.waiting = false;

        if (result instanceof FindError) {
            this.#handleError(result);
            return;
        }

        this.fahrzeug = result;
        this.errorMsg = undefined;

        const title = `Details ${this.fahrzeug.id}`;
        this.titleService.setTitle(title);
    }

    #handleError(err: FindError) {
        const { statuscode } = err;
        log.debug('DetailsComponent.handleError: statuscode=', statuscode);

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

        this.titleService.setTitle('Fehler');
    }
}
