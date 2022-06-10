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

/**
 * Komponente f&uuml;r das Tag <code>&lt;hs-suche-buecher&gt;</code>, die aus
 * den Kindkomponenten f&uuml;r diese Tags besteht:
 * <ul>
 *  <li> <code>hs-suchformular</code>
 *  <li> <code>hs-waiting</code>
 *  <li> <code>hs-suchergebnis</code>
 * </ul>
 */
@Component({
    selector: 'hs-suche-fahrzeuge',
    templateUrl: './suche-fahrzeuge.component.html',
    styleUrls: ['./suche-farhzeug.scss'],
})
export class SucheFahrzeugeComponent implements OnInit {
    waiting = false;

    fahrzeuge: Fahrzeug[] = [];

    errorMsg: string | undefined;

    // Parameter Properties (Empfehlung: Konstruktor nur fuer DI)
    constructor(
        private readonly service: FahrzeugReadService,
        private readonly titleService: Title,
    ) {
        log.debug('SucheFahrzeugeComponent.constructor()');
    }

    // Wird von Angular aufgerufen, wenn der DOM-Baum fertig ist,
    // d.h. nach dem "Rendering".
    // Wird immer generiert, wenn Angular-CLI genutzt wird.
    ngOnInit() {
        this.titleService.setTitle('Suche');
    }

    /**
     * Das Attribut <code>suchkriterien</code> wird auf den Wert des Ereignisses
     * <code>suchkriterien</code> vom Typ Suchkriterien gesetzt. Diese Methode
     * wird aufgerufen, wenn in der Kindkomponente f&uuml;r
     * <code>hs-suchformular</code> das Ereignis ausgel&ouml;st wird.
     *
     * @param suchkriterien f&uuml;r die Suche.
     */
    suchen(suchkriterien: Suchkriterien) {
        log.debug(
            'SucheFahrzeugeComponent.suchen: suchkriterien=',
            suchkriterien,
        );

        this.fahrzeuge = [];
        this.errorMsg = undefined;

        this.waiting = true;

        // Observable: mehrere Werte werden "lazy" bereitgestellt, statt in einem JSON-Array
        // pipe ist eine "pure" Funktion, die ein Observable in ein NEUES Observable transformiert
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
        log.debug('SucheBuecherComponent.#setProps: buecher=', this.fahrzeuge);
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
