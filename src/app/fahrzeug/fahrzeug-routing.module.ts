import { RouterModule, type Routes } from '@angular/router';
import { AdminGuard } from '../auth/admin.guard';
import { BuchModule } from './fahrzeug.module';
import { NgModule } from '@angular/core';

// Route-Definitionen fuer das Feature-Modul "buch":
// Zuordnung von Pfaden und Komponenten mit HTML-Templates
const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild(routes), BuchModule],
    exports: [RouterModule],
})
export class FahrzeugRoutingModule {}
