import { Component, Output } from '@angular/core';
import { type Fahrzeugtyp } from '../../shared/fahrzeug';
import { Subject } from 'rxjs';
import { type Suchkriterien } from '../../shared';
import log from 'loglevel';

/**
 * Component for the tag <code>hs-suchformular</code>
 */
@Component({
    selector: 'hs-suchformular',
    templateUrl: './suchformular.component.html',
})
export class SuchformularComponent {
    @Output()
    readonly suchkriterien$ = new Subject<Suchkriterien>();

    #kennzeichen = '';

    #fahrzeugtype: Fahrzeugtyp | '' = '';

    #vorname = '';

    #nachname = '';

    constructor() {
        log.debug('SuchformularComponent.constructor()');
    }

    setKennzeichen(kennzeichen: string) {
        log.debug('SuchformularComponent.setKennzeichen', kennzeichen);
        this.#kennzeichen = kennzeichen;
    }

    setFahrzeugtyp(fahrzeugtyp: Fahrzeugtyp | '') {
        log.debug('SuchformularComponent.setFahrzeugtyp', fahrzeugtyp);
        this.#fahrzeugtype = fahrzeugtyp;
    }

    setVorname(vorname: string) {
        log.debug('SuchformularComponent.setVorname', vorname);
        this.#vorname = vorname;
    }

    setNachname(nachname: string) {
        log.debug('SuchformularComponent.setNachname', nachname);
        this.#nachname = nachname;
    }

    /**
     * Search fahrzeuge which correspond to the search criteria
     * @return false, to cancel the event of the button
     */
    onSubmit() {
        log.debug(
            'SuchformularComponent.onSubmit: kennzeichen / fahrzeugtyp / fahrzeughalter',
            this.#kennzeichen,
            this.#fahrzeugtype,
            this.#vorname,
            this.#nachname,
        );

        this.suchkriterien$.next({
            kennzeichen: this.#kennzeichen,
            fahrzeugtype: this.#fahrzeugtype,
            fahrzeughalter: {
                vorname: this.#vorname,
                nachname: this.#nachname,
            },
        });

        return false;
    }
}
