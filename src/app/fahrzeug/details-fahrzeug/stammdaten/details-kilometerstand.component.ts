import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * component for the tag <code>hs-details-kilometerstand</code>
 */
@Component({
    selector: 'hs-details-kilometerstand',
    templateUrl: './details-kilometerstand.component.html',
})
export class DetailsKilometerstandComponent implements OnInit {
    @Input()
    kilometerstand!: number;

    ngOnInit() {
        log.debug(
            'DetailsKilometerstandComponent.kilometerstand=',
            this.kilometerstand,
        );
    }
}
