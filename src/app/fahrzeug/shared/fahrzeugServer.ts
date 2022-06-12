import { type Fahrzeug, type FahrzeugShared } from './fahrzeug';
import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

interface Link {
    href: string;
}

export interface FahrzeugServer extends FahrzeugShared {
    erstzulassung?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _links?: {
        self: Link;
        list?: Link;
        add?: Link;
        update?: Link;
        remove?: Link;
    };
}

/**
 * create one Fahrzeug-Object with JSON-Data from a RESTful Web Service
 * @param fahrzeug JSON-Object with Data from a RESTful Web Server
 * @return the initialized Fahrzeug-Object
 */
export const toFahrzeug = (fahrzeugServer: FahrzeugServer, etag?: string) => {
    let selfLink: string | undefined;
    const { _links } = fahrzeugServer; // eslint-disable-line @typescript-eslint/naming-convention
    if (_links !== undefined) {
        const { self } = _links;
        selfLink = self.href;
    }
    let id: string | undefined;
    if (selfLink !== undefined) {
        const lastSlash = selfLink.lastIndexOf('/');
        id = selfLink.slice(lastSlash + 1);
    }

    let version: number | undefined;
    if (etag !== undefined) {
        const versionStr = etag.slice(1, -1);
        version = Number.parseInt(versionStr, 10);
    }

    const {
        beschreibung,
        kennzeichen,
        kilometerstand,
        erstzulassung,
        fahrzeugtype,
        fahrzeughalter,
    } = fahrzeugServer;

    let datumTemporal: Temporal.PlainDate | undefined;

    if (erstzulassung !== undefined) {
        const [yearStr, monthStr, dayStr] = erstzulassung
            .replace(/T.*/gu, '')
            .split('-');
        const year = Number(yearStr);
        const month = Number(monthStr);
        const day = Number(dayStr);
        datumTemporal = new Temporal.PlainDate(year, month, day);
    }

    const { vorname, nachname } = fahrzeughalter;

    const fahrzeug: Fahrzeug = {
        id,
        beschreibung,
        kennzeichen,
        kilometerstand,
        erstzulassung: datumTemporal,
        fahrzeugtype,
        fahrzeughalter: { vorname, nachname },
        version,
    };
    log.debug('Fahrzeug.fromServer: fahrzeug=', fahrzeug);
    return fahrzeug;
};

/**
 * convert the fahrzeug object to a JSON-Objekt for the RESTful Web Service.
 * @return the JSON-Objet for the RESTful Web Service
 */
export const toFahrzeugServer = (fahrzeug: Fahrzeug): FahrzeugServer => {
    const erstzulassung =
        fahrzeug.erstzulassung === undefined
            ? undefined
            : fahrzeug.erstzulassung.toString();
    return {
        beschreibung: fahrzeug.beschreibung,
        kennzeichen: fahrzeug.kennzeichen,
        kilometerstand: fahrzeug.kilometerstand,
        erstzulassung,
        fahrzeugtype: fahrzeug.fahrzeugtype,
        fahrzeughalter: fahrzeug.fahrzeughalter,
    };
};
