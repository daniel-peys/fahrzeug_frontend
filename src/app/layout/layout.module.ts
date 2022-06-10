import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { MainModule } from './main/main.module';
import { NgModule } from '@angular/core';

@NgModule({ exports: [FooterModule, HeaderModule, MainModule] })
export class LayoutModule {}
