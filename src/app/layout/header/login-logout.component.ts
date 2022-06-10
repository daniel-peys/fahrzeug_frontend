import { Component, type OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import log from 'loglevel';

@Component({
    selector: 'hs-login-logout',
    templateUrl: './login-logout.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginLogoutComponent implements OnInit {
    username: string | undefined;
    password: string | undefined;

    isLoggedIn$!: Subject<boolean>;
    init!: boolean;

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {
        log.debug('LoginLogoutComponent.constructor()');
    }

    ngOnInit() {
        log.debug(
            'LoginLogoutComponent.ngOnInit: ',
            this.authService.isLoggedIn,
        );

        this.isLoggedIn$ = this.authService.isLoggedIn$;
        this.isLoggedIn$.subscribe();
        this.init = this.authService.isLoggedIn;
    }

    /**
     * login
     * @returns login result
     */
    onLogin() {
        log.debug('LoginLogoutComponent.onLogin()');
        if (this.username === undefined || this.username === null) {
            return;
        }
        const loginResult = this.authService.login(
            this.username,
            this.password,
        );
        this.init = false;
        return loginResult;
    }

    /**
     * logout
     * @return username and password
     */
    onLogout() {
        log.debug('LoginLogoutComponent.onLogout()');
        this.authService.logout();
        this.init = false;
        this.isLoggedIn$.next(false);
        return this.router.navigate(['/']);
    }
}
