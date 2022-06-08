import { Component } from '@angular/core';
import log from 'loglevel';

@Component({
    selector: 'hs-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
    constructor() {
        log.debug('LogoComponent.constructor()');
    }
}
