import { GefundeneFahrzeugeModule } from '../gefundene-fahrzeuge/gefundene-fahrzeuge.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { SuchergebnisComponent } from './suchergebnis.component';

@NgModule({
    imports: [GefundeneFahrzeugeModule, SharedModule],
    declarations: [SuchergebnisComponent],
    exports: [SuchergebnisComponent],
})
export class SuchergebnisModule {}
