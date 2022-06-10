import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [HomeComponent],
    providers: [Title],
})
export class HomeModule {}
