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

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';
import { UpdateBeschreibungComponent } from './update-beschreibung.component';
import { UpdateFahrzeugComponent } from './update-fahrzeug.component';
import { UpdateFahrzeughalterComponent } from './update-fahrzeughalter.component';
import { UpdateFahrzeugtypComponent } from './update-fahrzeugtyp.component';
import { UpdateKennzeichenComponent } from './update-kennzeichen.component';
import { UpdateKilometerstandComponent } from './update-kilometerstand.component';

@NgModule({
    imports: [MatInputModule, MatSelectModule, SharedModule],
    declarations: [
        UpdateBeschreibungComponent,
        UpdateFahrzeugComponent,
        UpdateFahrzeughalterComponent,
        UpdateFahrzeugtypComponent,
        UpdateKennzeichenComponent,
        UpdateKilometerstandComponent,
    ],
    exports: [MatInputModule, MatSelectModule],
    providers: [Title],
})
export class UpdateFahrzeugModule {}
