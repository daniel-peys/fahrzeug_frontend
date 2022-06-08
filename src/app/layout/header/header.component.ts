import { Component } from '@angular/core';
import log from 'loglevel';

@Component({
    selector: 'hs-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor() {
        log.debug('HeaderComponent.constructor()');
    }
}
