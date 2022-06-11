/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable object-curly-newline */
import { CreateFahrzeugModule } from './create-fahrzeug/create-fahrzeug.module';
import { DetailsFahrzeugModule } from './details-fahrzeug/details-fahrzeug.module';
import { NgModule } from '@angular/core';
import { SucheFahrzeugModule } from './suche-fahrzeug/suche-fahrzeuge.module';

@NgModule({
    imports: [CreateFahrzeugModule, DetailsFahrzeugModule, SucheFahrzeugModule],
})
export class FahrzeugModule {}
