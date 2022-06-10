import { PreloadAllModules, RouterModule, type Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

// Route-Definitionen fuer den Root-Router
// Eine Route leitet zu einer neuen Ansicht ("View") in der SPA, wobei die
// vorherige Ansicht ueberdeckt bzw. ausgeblendet wird.
const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        // redirect erfordert pathMatch full
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
