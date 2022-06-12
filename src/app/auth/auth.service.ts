import { first, tap } from 'rxjs/operators';
import { BasicAuthService } from './basic-auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Subject } from 'rxjs';
import log from 'loglevel';

export const ROLLE_ADMIN = 'ADMIN';

@Injectable({ providedIn: 'root' })
export class AuthService {
    readonly isLoggedIn$ = new Subject<boolean>();

    readonly rollen$ = new Subject<string[]>();

    constructor(
        private readonly basicAuthService: BasicAuthService,
        private readonly storageService: StorageService,
    ) {
        // OnInit works only with @Component
        if (this.isLoggedIn) {
            log.debug('AuthService.constructor: bereits eingeloggt');
            this.isLoggedIn$.next(true);

            const rollen = this.roles;
            if (rollen.length > 0) {
                log.debug('AuthService.constructor: rollen=', rollen);
                this.rollen$.next(rollen);
            }

            return;
        }

        log.debug('AuthService.constructor: noch nicht eingeloggt');
        this.isLoggedIn$.next(false);
    }

    /**
     * @param username as string
     * @param password as string
     * @return void
     */
    login(username: string | undefined, password: string | undefined) {
        log.debug(
            `AuthService.login: username=${username}, password=${password}`,
        );

        this.basicAuthService
            .login(username, password)
            .pipe(
                first(),
                tap(result => this.#handleLogin(result)),
            )
            .subscribe();
    }

    #handleLogin(result: string[] | undefined) {
        log.debug('AuthService.login: result', result);
        if (result === undefined) {
            this.isLoggedIn$.next(false);
            this.rollen$.next([]);
        } else {
            this.isLoggedIn$.next(true);
            this.rollen$.next(result);
        }
    }

    /**
     * @return void
     */
    logout() {
        log.debug('AuthService.logout()');
        this.storageService.deleteAuthorization();
        this.isLoggedIn$.next(false);
        this.rollen$.next([]);
    }

    /**
     * @return string for JWT or Basic-Authentifizierung
     */
    get authorization() {
        return this.storageService.authorization;
    }

    /**
     * static query, e.g at the start of the browswer, before a click event
     * @return true, if a user is logged in; else false.
     */
    get isLoggedIn() {
        return this.storageService.authorization !== undefined;
    }

    /**
     * static query, e.g at the start of the browswer, before a click event
     * @return true, if a user is logged in; else false.
     */
    get isAdmin() {
        console.log(`!TEST!${this.storageService.roles.includes(ROLLE_ADMIN)}`);
        return this.storageService.roles.includes(ROLLE_ADMIN);
    }

    /**
     * static query, e.g at the start of the browswer, before a click event
     * @return Array of all roles.
     */
    get roles() {
        return this.storageService.roles;
    }
}
