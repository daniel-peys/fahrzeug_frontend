import { Component } from '@angular/core';
import log from 'loglevel';

@Component({
    selector: 'hs-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    constructor() {
        log.debug('FooterComponent.constructor()');
    }
}
