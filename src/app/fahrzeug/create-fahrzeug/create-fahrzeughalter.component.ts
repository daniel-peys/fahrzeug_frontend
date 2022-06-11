import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * component with the tag <hs-create-fahrzeughalter>
 */
@Component({
    selector: 'hs-create-fahrzeughalter',
    templateUrl: './create-fahrzeughalter.component.html',
})
export class CreateFahrzeughalterComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly vorname = new FormControl(undefined, [Validators.required]);

    readonly nachname = new FormControl(undefined, [Validators.required]);

    ngOnInit() {
        log.debug('CreateFahrzeughalterComponent.ngOnInit');
        this.createForm.addControl('vorname', this.vorname);
        this.createForm.addControl('nachname', this.nachname);
    }
}
