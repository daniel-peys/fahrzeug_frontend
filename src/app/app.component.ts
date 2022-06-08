import { Component } from '@angular/core';
import log from 'loglevel';

@Component({
    selector: 'hs-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor() {
        log.debug('AppComponent.constructor()');
    }
}
