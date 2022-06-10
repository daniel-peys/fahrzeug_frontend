import { Component, Output } from '@angular/core';
import { type Fahrzeugtyp } from '../../shared/fahrzeug';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-suche-verlag</code>
 */
@Component({
    selector: 'hs-suche-fahrzeugtyp',
    templateUrl: './suche-fahrzeugtyp.component.html',
    styleUrls: ['./suche-fahrzeugtyp.component.scss'],
})
export class SucheFahrzeugtypComponent {
    fahrzeugtype: Fahrzeugtyp | '' = '';

    @Output()
    readonly fahrzeugtype$ = new Subject<Fahrzeugtyp | ''>();

    constructor() {
        log.debug('SucheFahrzeugtypComponent.constructor()');
    }

    onChange(value: string) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript
        log.debug('SucheFahrzeugtypComponent.onChange: value=', value);
        this.fahrzeugtype$.next(value as Fahrzeugtyp | '');
    }
}
