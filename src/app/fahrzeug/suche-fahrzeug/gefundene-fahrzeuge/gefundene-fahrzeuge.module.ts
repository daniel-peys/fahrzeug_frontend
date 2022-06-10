import { GefundeneFahrzeugeComponent } from './gefundene-fahrzeuge.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [GefundeneFahrzeugeComponent],
    exports: [GefundeneFahrzeugeComponent],
})
export class GefundeneFahrzeugeModule {}
