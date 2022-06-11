import { RouterModule, type Routes } from '@angular/router';
import { AdminGuard } from '../auth/admin.guard';
import { DetailsFahrzeugComponent } from './details-fahrzeug/details-fahrzeug.component';
import { FahrzeugModule } from './fahrzeug.module';
import { NgModule } from '@angular/core';
import { SucheFahrzeugeComponent } from './suche-fahrzeug/suche-fahrzeuge.component';

// route definitions for the feature-module "fahrzeug":
const routes: Routes = [
    {
        path: 'suche',
        component: SucheFahrzeugeComponent,
    },
    {
        path: ':id',
        component: DetailsFahrzeugComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), FahrzeugModule],
    exports: [RouterModule],
})
export class FahrzeugRoutingModule {}
