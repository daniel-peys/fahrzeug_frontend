import { Component } from '@angular/core';
import log from 'loglevel';

@Component({
    selector: 'hs-waiting',
    templateUrl: './waiting.component.html',
    styleUrls: ['./waiting.component.scss'],
})
export class WaitingComponent {
    constructor() {
        log.debug('WaitingComponent.constructor()');
    }
}
