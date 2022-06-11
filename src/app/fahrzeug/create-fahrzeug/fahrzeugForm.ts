import { type Fahrzeug, type FahrzeugSharedWrite } from '../shared';
import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

export interface FahrzeugForm extends FahrzeugSharedWrite {
    erstzulassung: Date;
}

/**
 * create an Fahrzeug object whith JSON data from a form
 * @param fahrzeug JSON object with data from a form
 * @return the fahrzeug object
 */
export const toFahrzeug = (fahrzeugForm: FahrzeugForm) => {
    log.debug('toFahrzeug: fahzeugForm=', fahrzeugForm);

    const {
        beschreibung,
        kennzeichen,
        kilometerstand,
        erstzulassung,
        fahrzeugtype,
        vorname,
        nachname,
    } = fahrzeugForm;

    const erstzulassungTemporal = new Temporal.PlainDate(
        erstzulassung.getFullYear(),
        erstzulassung.getMonth() + 1,
        erstzulassung.getDate(),
    );
    log.debug('toFahrzeug: erstzulassungTemporal=', erstzulassungTemporal);

    const fahrzeug: Fahrzeug = {
        beschreibung,
        kennzeichen,
        kilometerstand,
        fahrzeugtype,
        erstzulassung: erstzulassungTemporal,
        fahrzeughalter: {
            vorname,
            nachname,
        },
        version: 0,
    };
    log.debug('toFahrzeug: fahrzeug=', fahrzeug);
    return fahrzeug;
};
