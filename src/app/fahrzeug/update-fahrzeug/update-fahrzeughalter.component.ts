import { Component, Input, type OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * component for the tag <code>hs-update-titel</code>
 */
@Component({
    selector: 'hs-update-fahrzeughalter',
    templateUrl: './update-fahrzeughalter.component.html',
})
export class UpdateFahrzeughalterComponent implements OnInit {
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValueVorname!: string;

    @Input()
    currentValueNachname!: string;

    vorname!: FormControl;

    nachname!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateVornameComponent.ngOnInit: currentValue=',
            this.currentValueVorname,
        );
        log.debug(
            'UpdateNachnameComponent.ngOnInit: currentValue=',
            this.currentValueNachname,
        );
        this.vorname = new FormControl(this.currentValueVorname);
        this.nachname = new FormControl(this.currentValueNachname);
        this.updateForm.addControl('vorname', this.vorname);
        this.updateForm.addControl('nachname', this.nachname);
    }
}
