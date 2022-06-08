import { HeaderComponent } from './header.component';
import { LoginLogoutComponent } from './login-logout.component';
import { LogoComponent } from './logo.component';
import { MatInputModule } from '@angular/material/input';
import { NavComponent } from './nav.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [MatInputModule, SharedModule],
    declarations: [
        HeaderComponent,
        LoginLogoutComponent,
        LogoComponent,
        NavComponent,
    ],
    exports: [HeaderComponent, MatInputModule],
})
export class HeaderModule {}
