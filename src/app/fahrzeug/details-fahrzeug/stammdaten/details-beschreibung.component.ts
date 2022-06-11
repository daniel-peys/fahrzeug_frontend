import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * component for the tag <code>hs-details-beschreibung</code>
 */
@Component({
    selector: 'hs-details-beschreibung',
    templateUrl: './details-beschreibung.component.html',
})
export class DetailsBeschreibungComponent implements OnInit {
    @Input()
    beschreibung!: string;

    ngOnInit() {
        log.debug(
            'DetailsBeschreibungComponent.beschreibung=',
            this.beschreibung,
        );
    }
}
