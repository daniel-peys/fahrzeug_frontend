/*
 * Copyright (C) 2016 - present Juergen Zimmermann, Hochschule Karlsruhe
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

import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';
import { UpdateBeschreibungComponent } from './update-beschreibung.component';
import { UpdateFahrzeughalterComponent } from './update-fahrzeughalter.component';
import { UpdateKilometerstandComponent } from './update-kilometerstand.component';
import { UpdateKennzeichenComponent } from './update-kennzeichen.component';
import { UpdateFahrzeugtypComponent } from './update-fahrzeugtyp.component';

@NgModule({
    imports: [SharedModule],
    declarations: [
        UpdateBeschreibungComponent,
        UpdateFahrzeughalterComponent,
        UpdateKilometerstandComponent,
        UpdateKennzeichenComponent,
        UpdateFahrzeugtypComponent ,
    ],
    providers: [Title],
})
export class UpdateFahrzeugModule {}
