import { PreloadAllModules, RouterModule, type Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        // redirect requires pathMatch full
        pathMatch: 'full',
        component: HomeComponent,
    },
    {
        path: 'fahrzeuge',
        // Lazy Loading
        loadChildren: () =>
            import('./fahrzeug/fahrzeug-routing.module').then(
                m => m.FahrzeugRoutingModule,
            ),
    },
];

@NgModule({
    /* eslint-disable array-bracket-newline */
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    /* eslint-enable array-bracket-newline */
    exports: [RouterModule],
})
export class AppRoutingModule {}
