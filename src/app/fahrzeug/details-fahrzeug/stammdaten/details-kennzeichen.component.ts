import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * component for the tag <code>hs-details-kennzeichen</code>
 */
@Component({
    selector: 'hs-details-kennzeichen',
    templateUrl: './details-kennzeichen.component.html',
})
export class DetailsKennzeichenComponent implements OnInit {
    @Input()
    kennzeichen!: string;

    ngOnInit() {
        log.debug('DetailsKennzeichenComponent.kennzeichen=', this.kennzeichen);
    }
}
