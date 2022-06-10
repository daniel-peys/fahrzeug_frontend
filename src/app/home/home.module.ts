import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [HomeComponent],
    // Der Singleton-Service "Title" wird benoetigt
    providers: [Title],
})
export class HomeModule {}
