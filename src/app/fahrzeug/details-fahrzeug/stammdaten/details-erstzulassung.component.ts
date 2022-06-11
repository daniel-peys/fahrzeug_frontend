import { Component, Input, type OnInit } from '@angular/core';
import { type Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

/**
 * component for the tag <code>hs-details-erstzulassung</code>
 */
@Component({
    selector: 'hs-details-erstzulassung',
    templateUrl: './details-erstzulassung.component.html',
})
export class DetailsErstzulassungComponent implements OnInit {
    @Input()
    erstzulassung: Temporal.PlainDate | undefined;

    ngOnInit() {
        log.debug(
            'DetailsErstzulassungComponent: erstzulassung=',
            this.erstzulassung,
        );
    }
}
