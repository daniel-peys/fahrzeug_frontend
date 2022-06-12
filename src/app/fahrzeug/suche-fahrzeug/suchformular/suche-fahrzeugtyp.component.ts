import { Component, Output } from '@angular/core';
import { type Fahrzeugtyp } from '../../shared/fahrzeug';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * component for the tag <code>hs-suche-verlag</code>
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
        log.debug('SucheFahrzeugtypComponent.onChange: value=', value);
        this.fahrzeugtype$.next(value as Fahrzeugtyp | '');
    }
}
