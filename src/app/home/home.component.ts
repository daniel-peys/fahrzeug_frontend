import { Component, type OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

@Component({
    selector: 'hs-home',
    template: '',
})
export class HomeComponent implements OnInit {
    constructor(private readonly title: Title) {
        log.debug('HomeComponent.constructor()');
    }

    ngOnInit() {
        this.title.setTitle('Fahrzeug | Home');
    }
}
