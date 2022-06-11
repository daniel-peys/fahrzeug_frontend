import { DetailsBeschreibungComponent } from './details-beschreibung.component';
import { DetailsErstzulassungComponent } from './details-erstzulassung.component';
import { DetailsFahrzeughalterComponent } from './details-fahrzeughalter.component';
import { DetailsFahrzeugtypComponent } from './details-fahrzeugtyp.component';
import { DetailsKennzeichenComponent } from './details-kennzeichen.component';
import { DetailsKilometerstandComponent } from './details-kilometerstand.component';
import { DetailsStammdatenComponent } from './details-stammdaten.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [
        DetailsBeschreibungComponent,
        DetailsErstzulassungComponent,
        DetailsFahrzeughalterComponent,
        DetailsFahrzeugtypComponent,
        DetailsKennzeichenComponent,
        DetailsKilometerstandComponent,
        DetailsStammdatenComponent,
    ],
    exports: [DetailsStammdatenComponent],
})
export class DetailsStammdatenModule {}
