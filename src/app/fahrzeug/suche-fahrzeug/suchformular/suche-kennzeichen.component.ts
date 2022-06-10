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

import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-suche-titel</code>
 */
@Component({
    selector: 'hs-suche-kennzeichen',
    templateUrl: './suche-kennzeichen.component.html',
})
export class SucheKennzeichenComponent {
    kennzeichen = '';

    @Output()
    readonly kennzeichen$ = new Subject<string>();

    constructor() {
        log.debug('SucheKennzeichnComponent.constructor()');
    }

    onBlur() {
        log.debug(
            `SucheKennzeichenComponent.onBlur: kennzeichen=${this.kennzeichen}`,
        );
        this.kennzeichen$.next(this.kennzeichen);
    }
}
