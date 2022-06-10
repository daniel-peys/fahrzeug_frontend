import { Component, Input } from '@angular/core';
import log from 'loglevel';

/**
 * Component which displays an error message
 */
@Component({
    selector: 'hs-error-message',
    templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
    @Input()
    text: string | undefined;

    constructor() {
        log.debug('ErrorMessageComponent.constructor()');
    }
}
