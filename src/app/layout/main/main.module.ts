import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [MainComponent],
    exports: [MainComponent],
})
export class MainModule {}
