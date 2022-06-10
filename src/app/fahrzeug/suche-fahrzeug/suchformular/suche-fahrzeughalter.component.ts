import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Componen for the tag <code>hs-suche-titel</code>
 */
@Component({
    selector: 'hs-suche-fahrzeughalter',
    templateUrl: './suche-fahrzeughalter.component.html',
})
export class SucheFahrzeughalterComponent {
    vorname = '';

    nachname = '';

    @Output()
    readonly vorname$ = new Subject<string>();

    @Output()
    readonly nachname$ = new Subject<string>();

    constructor() {
        log.debug('SucheFahrzeughalterComponent.constructor()');
    }

    onBlurVorname() {
        log.debug(
            `SucheFahrzeughalterComponent.onBlur: vorname=${this.vorname}, nachname=${this.nachname}`,
        );
        this.vorname$.next(this.vorname);
    }

    onBlurNachname() {
        log.debug(
            `SucheFahrzeughalterComponent.onBlur: vorname=${this.nachname}, nachname=${this.nachname}`,
        );
        this.vorname$.next(this.nachname);
    }
}
