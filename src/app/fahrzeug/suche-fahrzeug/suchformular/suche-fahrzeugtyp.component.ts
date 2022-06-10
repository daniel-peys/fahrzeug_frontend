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
})
export class SucheFahrzeugtypComponent {
    fahrzeugtyp: Fahrzeugtyp | '' = '';

    @Output()
    readonly fahrzeugtyp$ = new Subject<Fahrzeugtyp | ''>();

    constructor() {
        log.debug('SucheFahrzeugtypComponent.constructor()');
    }

    onChange(event: Event) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript
        const { value } = event.target as HTMLSelectElement;
        log.debug('SucheFahrzeugtypComponent.onChange: value=', value);
        this.fahrzeugtyp$.next(value as Fahrzeugtyp | '');
    }
}
