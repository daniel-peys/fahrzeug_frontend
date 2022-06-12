/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/brace-style */
import {
    type ActivatedRouteSnapshot,
    type CanDeactivate,
    type RouterStateSnapshot,
    type UrlTree,
} from '@angular/router';
import { type CreateFahrzeugComponent } from './create-fahrzeug.component';
import { Injectable } from '@angular/core';
import { type Observable } from 'rxjs';
import log from 'loglevel';

@Injectable({ providedIn: 'root' })
export class CreateFahrzeugGuard
    implements CanDeactivate<CreateFahrzeugComponent>
{
    constructor() {
        log.debug('CreateFahrzeugGuard.constructor()');
    }

    canDeactivate(
        createFahrzeug: CreateFahrzeugComponent,
        _: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
        __: RouterStateSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
    ):
        | Observable<UrlTree | boolean>
        | Promise<UrlTree | boolean>
        | UrlTree
        | boolean {
        if (createFahrzeug.fertig) {
            return true;
        }

        createFahrzeug.showWarning = true;
        createFahrzeug.fertig = true;
        log.debug('CreateFahrzeugGuard.canDeactivate: Verlassen der Seite');
        return false;
    }
}
