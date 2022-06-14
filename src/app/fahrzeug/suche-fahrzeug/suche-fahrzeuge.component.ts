import { Component, type OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    type Fahrzeug,
    FahrzeugReadService,
    FindError,
    type Suchkriterien,
} from '../shared';
import { first, tap } from 'rxjs/operators';
import { HttpStatusCode } from '@angular/common/http';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

@Component({
    selector: 'hs-suche-fahrzeuge',
    templateUrl: './suche-fahrzeuge.component.html',
})
export class SucheFahrzeugeComponent implements OnInit {
    waiting = false;

    fahrzeuge: Fahrzeug[] = [];

    errorMsg: string | undefined;

    constructor(
        private readonly service: FahrzeugReadService,
        private readonly titleService: Title,
    ) {
        log.debug('SucheFahrzeugeComponent.constructor()');
    }

    ngOnInit() {
        this.titleService.setTitle('Suche');
    }

    /**
     * @param searchCriteria for the search.
     */
    suchen(suchkriterien: Suchkriterien) {
        log.debug(
            'SucheFahrzeugeComponent.suchen: suchkriterien=',
            suchkriterien,
        );

        this.fahrzeuge = [];
        this.errorMsg = undefined;

        this.waiting = true;

        this.service
            .find(suchkriterien) // eslint-disable-line unicorn/no-array-callback-reference
            .pipe(
                first(),
                tap(result => this.#setProps(result)),
            )
            .subscribe();
    }

    #setProps(result: Fahrzeug[] | FindError) {
        this.waiting = false;

        if (result instanceof FindError) {
            this.#handleFindError(result);
            return;
        }

        this.fahrzeuge = result;
        log.debug(
            'SucheFahrzeugComponent.#setProps: fahrzeuge=',
            this.fahrzeuge,
        );
    }

    #handleFindError(err: FindError) {
        const { statuscode } = err;
        log.debug(
            'SucheFahrzeugComponent.#handleError: statuscode=',
            statuscode,
        );

        switch (statuscode) {
            case HttpStatusCode.NotFound:
                this.errorMsg = 'Keine Fahrzeuge gefunden.';
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

        log.debug(
            'SucheFahrzeugeComponent.#setErrorMsg: errorMsg=',
            this.errorMsg,
        );
    }
}
