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
 * Component for the Tag <code>hs-gefundene-buecher</code>, to show the waiting first and afterwards
 * the result of the search (found or error)
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

    isAdmin$ = new Subject<boolean>();

    constructor(
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
                    this.isAdmin$.next(rollen.includes(ROLLE_ADMIN)),
                ),
            )
            .subscribe();
    }

    /**
     * Show the details of the clicked fahrzeug
     * @param fahrzeug the selected fahrzeug
     */
    onClick(fahrzeug: Fahrzeug) {
        log.debug('GefundeneFahrzeugeComponent.onClick: fahrzeug=', fahrzeug);

        // URL with the Fahrzeug-ID, to allow a Bookmark
        const state = { fahrzeug };
        return this.router.navigate([`/fahrzeuge/${fahrzeug.id}`], { state });
    }

    /**
     * delete the selected fahrzeug.
     * @param fahrzeug the fahrzeug
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
