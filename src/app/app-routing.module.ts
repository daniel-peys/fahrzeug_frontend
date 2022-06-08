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
        path: 'buecher',
        // Lazy Loading (statt Eager Loading) durch dynamische Imports (seit ES 2020)
        // loadChildren statt component wie bei '/'
        // zzgl. Preloading von sichtbaren Links (s.u.)
        // https://angular.io/guide/lazy-loading-ngmodules
        loadChildren: () =>
            import('./fahrzeug/fahrzeug-routing.module').then(
                m => m.FahrzeugRoutingModule,
            ),
    },
];

@NgModule({
    // https://angular.io/guide/router
    // https://next.angular.io/api/router/RouterModule
    /* eslint-disable array-bracket-newline */
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    /* eslint-enable array-bracket-newline */
    exports: [RouterModule],
})
export class AppRoutingModule {}
