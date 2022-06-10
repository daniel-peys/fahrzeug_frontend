/* eslint-disable max-classes-per-file */

import { AuthService, ROLLE_ADMIN } from '../../../auth/auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Component, Input, type OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    type Fahrzeug,
    FahrzeugReadService,
    FahrzeugWriteService,
    RemoveError,
} from '../../shared';
import { first, tap } from 'rxjs/operators';
import { NgLocalization } from '@angular/common';
import { Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-gefundene-buecher</code>, um zun&auml;chst
 * das Warten und danach das Ergebnis der Suche anzuzeigen, d.h. die gefundenen
 * B&uuml;cher oder eine Fehlermeldung.
 */
@Component({
    selector: 'hs-gefundene-fahrzeuge',
    templateUrl: './gefundene-fahrzeuge.component.html',
    styleUrls: ['./gefundene-fahrzeuge.component.scss'],
})
export class GefundeneFahrzeugeComponent implements OnInit {
    @Input()
    fahrzeuge: Fahrzeug[] = [];

    isAdmin!: boolean;

    // nachtraegliches Einloggen mit der Rolle "admin" beobachten
    isAdmin$ = new Subject<boolean>();

    // eslint-disable-next-line max-params
    constructor(
        private readonly service: FahrzeugReadService,
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly writeService: FahrzeugWriteService,
    ) {
        log.debug('GefundeneFahrzeugeComponent.constructor()');
    }

    ngOnInit() {
        log.debug('GefundeneFahrzeugeComponent.ngOnInit()');
        this.isAdmin = this.authService.isAdmin;

        this.authService.rollen$
            .pipe(
                first(),
                tap((rollen: string[]) =>
                    // ein neues Observable vom Typ boolean
                    this.isAdmin$.next(rollen.includes(ROLLE_ADMIN)),
                ),
            )
            // das Subject von AuthService abonnieren bzw. beobachten
            .subscribe();
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Fahrzeug in der Detailsseite anzeigen.
     * @param fahrzeug Das ausgew&auml;hlte Fahrzeug
     */
    onClick(fahrzeug: Fahrzeug) {
        log.debug('GefundeneFahrzeugeComponent.onClick: fahrzeug=', fahrzeug);

        // URL mit der Fahrzeug-ID, um ein Bookmark zu ermoeglichen
        // Gefundenes Fahrzeug als NavigationExtras im Router puffern
        const state = { fahrzeug };
        return this.router.navigate([`/fahrzeuge/${fahrzeug.id}`], { state });
    }

    /**
     * Das angeklickte fahrzeug loeschen.
     * @param fahrzeug Das fahrzeug
     */
    onRemove(fahrzeug: Fahrzeug) {
        log.debug('GefundeneFahrzeugComponent.onRemove: fahrzeug=', fahrzeug);

        return this.writeService
            .remove(fahrzeug)
            .pipe(
                first(),
                tap(result => {
                    if (result instanceof RemoveError) {
                        log.debug(
                            'GefundeneBuecherComponent.onRemove: statuscode=',
                            result.statuscode,
                        );
                        return;
                    }

                    this.fahrzeuge = this.fahrzeuge.filter(
                        f => f.id !== fahrzeug.id,
                    );
                }),
            )
            .subscribe();
    }

    trackBy(_index: number, fahrzeug: Fahrzeug) {
        return fahrzeug.id;
    }
}

export class AnzahlLocalization extends NgLocalization {
    getPluralCategory(count: number) {
        return count === 1 ? 'single' : 'multi';
    }
}

/* eslint-enable max-classes-per-file */
