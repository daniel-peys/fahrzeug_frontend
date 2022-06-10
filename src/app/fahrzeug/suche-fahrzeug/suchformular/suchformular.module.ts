import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { SucheFahrzeughalterComponent } from './suche-fahrzeughalter.component';
import { SucheFahrzeugtypComponent } from './suche-fahrzeugtyp.component';
import { SucheKennzeichenComponent } from './suche-kennzeichen.component';
import { SuchformularComponent } from './suchformular.component';

@NgModule({
    imports: [MatInputModule, SharedModule],
    declarations: [
        SucheFahrzeughalterComponent,
        SucheFahrzeugtypComponent,
        SucheKennzeichenComponent,
        SuchformularComponent,
    ],
    exports: [MatInputModule, SuchformularComponent],
})
export class SuchformularModule {}
