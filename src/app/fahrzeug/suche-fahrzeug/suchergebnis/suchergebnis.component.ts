import { Component, Input } from '@angular/core';
import { type Fahrzeug } from '../../shared';
import log from 'loglevel';

/**
 * Component for the tag <code>hs-suchergebnis</code>, to show the result of the search
 */
@Component({
    selector: 'hs-suchergebnis',
    templateUrl: './suchergebnis.component.html',
})
export class SuchergebnisComponent {
    @Input()
    fahrzeuge: Fahrzeug[] = [];

    @Input()
    errorMsg: string | undefined;

    constructor() {
        log.debug('SuchergebnisComponent.constructor()');
    }
}
