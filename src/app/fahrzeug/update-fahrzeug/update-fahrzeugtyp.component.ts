import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import { type Fahrzeugtyp } from '../shared/fahrzeug';
import log from 'loglevel';

/**
 * component for the tag <code>hs-update-verlag</code>
 */
@Component({
    selector: 'hs-update-fahrzeugtyp',
    templateUrl: './update-fahrzeugtyp.component.html',
})
export class UpdateFahrzeugtypComponent implements OnInit {
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue: Fahrzeugtyp | '' | undefined;

    fahrzeugtype!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateFahrzeugtypComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        this.fahrzeugtype = new FormControl(this.currentValue);
        this.updateForm.addControl('fahrzeugtype', this.fahrzeugtype);
    }
}
