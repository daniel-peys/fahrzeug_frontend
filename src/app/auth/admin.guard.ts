// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    type ActivatedRouteSnapshot,
    type CanActivate,
    Router,
    type RouterStateSnapshot,
    type UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Injectable } from '@angular/core';
import { type Observable } from 'rxjs';
import log from 'loglevel';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {
        log.debug('AdminGuard.constructor()');
    }

    canActivate(
        _: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
        __: RouterStateSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
    ):
        | Observable<UrlTree | boolean>
        | Promise<UrlTree | boolean>
        | UrlTree
        | boolean {
        if (this.authService.isAdmin) {
            log.debug('AdminGuard.canActivate: admin');
            return true;
        }

        log.debug('AdminGuard.canActivate: nicht "admin"');
        // cancels the navigation to redirect to a new path
        return this.router.createUrlTree(['/']);
    }
}
