import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SucheFahrzeugeComponent } from './suche-fahrzeuge.component';
import { SuchergebnisModule } from './suchergebnis/suchergebnis.module';
import { SuchformularModule } from './suchformular/suchformular.module';
import { Title } from '@angular/platform-browser';

@NgModule({
    imports: [SharedModule, SuchergebnisModule, SuchformularModule],
    declarations: [SucheFahrzeugeComponent],
    providers: [Title],
})
export class SucheFahrzeugModule {}
