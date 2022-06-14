import { Component } from '@angular/core';
import log from 'loglevel';

@Component({
    selector: 'hs-darkmode',
    templateUrl: './darkmode.component.html',
})
export class DarkmodeComponent {
    constructor() {
        log.debug('DarkmodeComponent.constructor()');
    }

    readonly bgPrimaryDark = '#303030';

    readonly bgSecondayDark = '#454545';

    readonly fontColorDark = '#ffffff';

    readonly bgPrimaryLight = '#ffffff';

    readonly bgSecondayLight = '#e91e62';

    readonly fontColorLight = '#000000';

    darkMode = true;

    /**
     * switches the color mode from dark to light and vice versa
     */
    switchColorMode() {
        if (this.darkMode) {
            document.documentElement.style.setProperty(
                '--bg-color-primary',
                this.bgPrimaryLight,
            );
            document.documentElement.style.setProperty(
                '--bg-color-secondary',
                this.bgSecondayLight,
            );
            document.documentElement.style.setProperty(
                '--font-color',
                this.fontColorLight,
            );
            this.darkMode = !this.darkMode;
        } else {
            document.documentElement.style.setProperty(
                '--bg-color-primary',
                this.bgPrimaryDark,
            );
            document.documentElement.style.setProperty(
                '--bg-color-secondary',
                this.bgSecondayDark,
            );
            document.documentElement.style.setProperty(
                '--font-color',
                this.fontColorDark,
            );
            this.darkMode = !this.darkMode;
        }
    }
}
