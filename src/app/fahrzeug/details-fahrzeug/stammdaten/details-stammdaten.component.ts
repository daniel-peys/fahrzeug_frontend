import { Component, Input, type OnInit } from '@angular/core';
import { type Fahrzeug } from '../../shared/fahrzeug';
import log from 'loglevel';

/**
 * component for the tag <code>hs-stammdaten</code>
 */
@Component({
    selector: 'hs-details-stammdaten',
    templateUrl: './details-stammdaten.component.html',
})
export class DetailsStammdatenComponent implements OnInit {
    @Input()
    fahrzeug!: Fahrzeug;

    ngOnInit() {
        log.debug('DetailsStammdatenComponent.fahrzeug=', this.fahrzeug);
    }
}
