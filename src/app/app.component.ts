/* eslint-disable sort-imports */
/* eslint-disable no-empty-function */
import { Component } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FahrzeugReadService, Suchkriterien } from './fahrzeug/shared';

@Component({
    selector: 'hs-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'Fahrzeug-A2';

    // eslint-disable-next-line no-useless-constructor
    constructor(private readonly service: FahrzeugReadService) {}

    suchkriterien: Suchkriterien = {
        kennzeichen: '',
        fahrzeugtyp: 'P',
        fahrzeughalter: { vorname: '', nachname: '' },
    };

    test() {
        // eslint-disable-next-line rxjs/no-ignored-error
        this.service.find(this.suchkriterien).subscribe(x => console.log(x));
    }
}
