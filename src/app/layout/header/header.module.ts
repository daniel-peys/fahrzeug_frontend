import { DarkmodeComponent } from './darkmode.component';
import { HeaderComponent } from './header.component';
import { LoginLogoutComponent } from './login-logout.component';
import { LogoComponent } from './logo.component';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavComponent } from './nav.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [MatInputModule, MatSlideToggleModule, SharedModule],
    declarations: [
        DarkmodeComponent,
        HeaderComponent,
        LoginLogoutComponent,
        LogoComponent,
        NavComponent,
    ],
    exports: [HeaderComponent, MatInputModule],
})
export class HeaderModule {}
