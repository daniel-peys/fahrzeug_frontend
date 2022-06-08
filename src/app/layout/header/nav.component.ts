import { AuthService, ROLLE_ADMIN } from '../../auth/auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Component, type OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import log from 'loglevel';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'hs-nav',
    templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
    isAdmin$ = new BehaviorSubject(false);

    constructor(private readonly authService: AuthService) {
        log.debug('NavComponent.constructor()');
    }

    ngOnInit() {
        if (this.authService.isAdmin) {
            log.debug('NavComponent.ngOnInit: bereits als admin eingeloggt');
            this.isAdmin$.next(true);
        }

        this.authService.rollen$
            .pipe(
                tap((rollen: string[]) =>
                    // ein neues Observable vom Typ boolean
                    this.isAdmin$.next(rollen.includes(ROLLE_ADMIN)),
                ),
            )
            // das Subject von AuthService abonnieren bzw. beobachten
            .subscribe();
    }
}
