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
