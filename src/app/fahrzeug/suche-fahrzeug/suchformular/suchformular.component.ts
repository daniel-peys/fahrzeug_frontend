import { Component, Output } from '@angular/core';
import { type Fahrzeughalter } from '../../shared/fahrzeughalter';
import { type Fahrzeugtyp } from '../../shared/fahrzeug';
import { Subject } from 'rxjs';
import { type Suchkriterien } from '../../shared';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-suchformular</code>
 */
@Component({
    selector: 'hs-suchformular',
    templateUrl: './suchformular.component.html',
})
export class SuchformularComponent {
    @Output()
    readonly suchkriterien$ = new Subject<Suchkriterien>();

    #kennzeichen = '';

    #fahrzeugtyp: Fahrzeugtyp | '' = '';

    #vorname = '';

    #nachname = '';

    // DI: Constructor Injection (React hat uebrigens keine DI)
    // Empfehlung: Konstruktor nur fuer DI
    constructor() {
        log.debug('SuchformularComponent.constructor()');
    }

    setKennzeichen(kennzeichen: string) {
        log.debug('SuchformularComponent.setKennzeichen', kennzeichen);
        this.#kennzeichen = kennzeichen;
    }

    setFahrzeugtyp(fahrzeugtyp: Fahrzeugtyp | '') {
        log.debug('SuchformularComponent.setFahrzeugtyp', fahrzeugtyp);
        this.#fahrzeugtyp = fahrzeugtyp;
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
     * Suche nach Fahrzeugen, die den spezfizierten Suchkriterien entsprechen
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    onSubmit() {
        log.debug(
            'SuchformularComponent.onSubmit: kennzeichen / fahrzeugtyp / fahrzeughalter',
            this.#kennzeichen,
            this.#fahrzeugtyp,
            this.#vorname,
            this.#nachname,
        );

        this.suchkriterien$.next({
            kennzeichen: this.#kennzeichen,
            fahrzeugtyp: this.#fahrzeugtyp,
            fahrzeughalter: {
                vorname: this.#vorname,
                nachname: this.#nachname,
            },
        });

        return false;
    }
}
