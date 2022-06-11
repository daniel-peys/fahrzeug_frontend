import { Component, Input, type OnInit } from '@angular/core';
import { type Fahrzeugtyp } from '../../shared/fahrzeug';
import log from 'loglevel';

/**
 * component for the tag <code>hs-details-Fahrzeugtyp</code>
 */
@Component({
    selector: 'hs-details-fahrzeugtyp',
    templateUrl: './details-fahrzeugtyp.component.html',
})
export class DetailsFahrzeugtypComponent implements OnInit {
    @Input()
    fahrzeugtype: Fahrzeugtyp | '' | undefined;

    ngOnInit() {
        log.debug(
            'DetailsFahrzeugtypComponent.fahrzeugtyp=',
            this.fahrzeugtype,
        );
    }
}
