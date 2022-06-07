/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import { type Fahrzeughalter } from './fahrzeughalter';
import { type Temporal } from '@js-temporal/polyfill';

/**
 * Alias-Typ für gültige Strings bei Fahrzeugtypen.
 */
export type Fahrzeugtyp = 'ANHAENGER' | 'NUTZFAHRZEUG' | 'PKW';

/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export interface Fahrzeug {
    id?: string;
    version?: number;
    beschreibung: string;
    kennzeichen: string;
    kilometerstand: number;
    erstzulassung: Temporal.PlainDate | undefined;
    fahrzeugtyp: Fahrzeugtyp;
    fahrzeughalter: Fahrzeughalter;
}

/**
 * Gemeinsame Datenfelder unabh&auml;ngig, ob die Buchdaten von einem Server
 * (z.B. RESTful Web Service) oder von einem Formular kommen.
 * Verwendung in den Interfaces:
 * - BuchServer für BuchReadService
 * - BuchForm für CreateBuchComponent
 */
export interface FahrzeugShared {
    beschreibung: string;
    kennzeichen: string;
    kilometerstand: number;
    fahrzeugtyp: Fahrzeugtyp;
    fahrzeughalter: Fahrzeughalter;
}
