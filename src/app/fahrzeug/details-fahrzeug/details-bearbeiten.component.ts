import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * component for the tag <code>hs-details-bearbeiten</code>
 */
@Component({
    selector: 'hs-details-bearbeiten',
    templateUrl: './details-bearbeiten.component.html',
    styleUrls: ['./details-bearbeiten.component.scss'],
})
export class DetailsBearbeitenComponent implements OnInit {
    @Input()
    id: string | undefined;

    ngOnInit() {
        log.debug('DetailsBearbeitenComponent.id=', this.id);
    }
}
