import { DetailsFahrzeugModule } from './details-fahrzeug/details-fahrzeug.module';
import { NgModule } from '@angular/core';
import { SucheFahrzeugModule } from './suche-fahrzeug/suche-fahrzeuge.module';

@NgModule({ imports: [DetailsFahrzeugModule, SucheFahrzeugModule] })
export class FahrzeugModule {}
