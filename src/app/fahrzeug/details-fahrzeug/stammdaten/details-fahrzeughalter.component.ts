import { Component, Input, type OnInit } from '@angular/core';
import type { Fahrzeughalter } from '../../shared/fahrzeughalter';
import log from 'loglevel';

/**
 * component for the tag <code>hs-details-fahrzeughalter</code>
 */
@Component({
    selector: 'hs-details-fahrzeughalter',
    templateUrl: './details-fahrzeughalter.component.html',
})
export class DetailsFahrzeughalterComponent implements OnInit {
    @Input()
    fahrzeughalter!: Fahrzeughalter;

    ngOnInit() {
        log.debug(
            'DetailsFahrzeughalterComponent.vorname = {} .nachname= {}',
            this.fahrzeughalter.vorname,
            this.fahrzeughalter.nachname,
        );
    }
}
