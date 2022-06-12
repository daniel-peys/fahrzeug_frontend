import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * component for the tag <hs-create-fahrzeugtyp>
 */
@Component({
    selector: 'hs-create-fahrzeugtyp',
    templateUrl: './create-fahrzeugtyp.component.html',
    styleUrls: ['./create-fahrzeugtyp.component.scss'],
})
export class CreateFahrzeugtypComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly fahrzeugtype = new FormControl(undefined, Validators.required);

    ngOnInit() {
        log.debug('CreateFahrzeugtypComponent.ngOnInit');
        this.createForm.addControl('fahrzeugtype', this.fahrzeugtype);
    }
}
