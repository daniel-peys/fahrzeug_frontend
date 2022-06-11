import { type Fahrzeughalter } from './fahrzeughalter';
import { type Temporal } from '@js-temporal/polyfill';

/**
 * Alias-Type for valid strings for Fahrzeugtypen.
 */
export type Fahrzeugtyp = 'A' | 'N' | 'P';

/**
 * Model as Plain-Old-JavaScript-Object (POJO) for the data and
 * Functions for queries and changes.
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
 * common data fields
 */
export interface FahrzeugShared {
    beschreibung: string;
    kennzeichen: string;
    kilometerstand: number;
    fahrzeugtype: Fahrzeugtyp;
    vorname: string;
    nachname: string;
}
