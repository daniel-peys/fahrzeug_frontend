import { type Fahrzeughalter } from './fahrzeughalter';
import { type Temporal } from '@js-temporal/polyfill';

/**
 * alias-type for valid strings for Fahrzeugtypen.
 */
export type Fahrzeugtyp = 'A' | 'N' | 'P';

/**
 * model as Plain-Old-JavaScript-Object (POJO) for the data and
 * functions for queries and changes.
 */
export interface Fahrzeug {
    id?: string;
    version?: number;
    beschreibung: string;
    kennzeichen: string;
    kilometerstand: number;
    erstzulassung: Temporal.PlainDate | undefined;
    fahrzeugtype: Fahrzeugtyp;
    fahrzeughalter: Fahrzeughalter;
}

/**
 * common data fields for reading
 */
export interface FahrzeugShared {
    beschreibung: string;
    kennzeichen: string;
    kilometerstand: number;
    fahrzeugtype: Fahrzeugtyp;
    fahrzeughalter: Fahrzeughalter;
}

/**
 * common data fields for writing
 */
export interface FahrzeugSharedWrite {
    beschreibung: string;
    kennzeichen: string;
    kilometerstand: number;
    fahrzeugtype: Fahrzeugtyp;
    vorname: string;
    nachname: string;
}
