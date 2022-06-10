import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Component for the tag <code>hs-suche-titel</code>
 */
@Component({
    selector: 'hs-suche-kennzeichen',
    templateUrl: './suche-kennzeichen.component.html',
})
export class SucheKennzeichenComponent {
    kennzeichen = '';

    @Output()
    readonly kennzeichen$ = new Subject<string>();

    constructor() {
        log.debug('SucheKennzeichnComponent.constructor()');
    }

    onBlur() {
        log.debug(
            `SucheKennzeichenComponent.onBlur: kennzeichen=${this.kennzeichen}`,
        );
        this.kennzeichen$.next(this.kennzeichen);
    }
}
