import { Component } from '@angular/core';
import log from 'loglevel';

@Component({
    selector: 'hs-main',
    template: `
        <main>
            <div class="col col-12 mt-3"><router-outlet></router-outlet></div>
        </main>
    `,
})
export class MainComponent {
    constructor() {
        log.debug('MainComponent.constructor()');
    }
}
