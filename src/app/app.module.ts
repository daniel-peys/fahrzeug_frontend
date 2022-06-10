import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModule } from './shared/shared.module';
import { appInitializer } from './app.initializer';
import { authInterceptorProvider } from './auth/auth.interceptor';
import { environment } from '../environments/environment';

@NgModule({
    imports: [
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),

        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        HomeModule,
        HttpClientModule,
        LayoutModule,
        SharedModule,
        // Not FahrzeugModule because of Lazy Loading
    ],
    declarations: [AppComponent],
    providers: [
        {
            // call while initialize
            provide: APP_INITIALIZER,
            useFactory: appInitializer,
            multi: true,
        },
        authInterceptorProvider,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
