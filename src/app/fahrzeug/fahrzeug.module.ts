import { CreateFahrzeugModule } from './create-fahrzeug/create-fahrzeug.module';
import { DetailsFahrzeugModule } from './details-fahrzeug/details-fahrzeug.module';
import { NgModule } from '@angular/core';
import { SucheFahrzeugModule } from './suche-fahrzeug/suche-fahrzeuge.module';
import { UpdateFahrzeugModule } from './update-fahrzeug/update-fahrzeug.module';

@NgModule({
    imports: [
        CreateFahrzeugModule,
        DetailsFahrzeugModule,
        SucheFahrzeugModule,
        UpdateFahrzeugModule,
    ],
})
export class FahrzeugModule {}
