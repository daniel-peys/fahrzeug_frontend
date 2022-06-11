import { Component } from '@angular/core';
import log from 'loglevel';

/**
 * component for the tag <code>hs-details-breadcrumbs</code>
 */
@Component({
    selector: 'hs-details-breadcrumbs',
    templateUrl: './details-breadcrumbs.component.html',
})
export class DetailsBreadcrumbsComponent {
    constructor() {
        log.debug('DetailsBreadcrumbsComponent.constructor()');
    }
}
