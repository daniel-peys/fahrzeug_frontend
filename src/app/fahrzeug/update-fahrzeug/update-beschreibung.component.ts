/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable array-bracket-newline */
import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * component for the tag <code>hs-update-titel</code>
 */
@Component({
    selector: 'hs-update-beschreibung',
    templateUrl: './update-beschreibung.component.html',
})
export class UpdateBeschreibungComponent implements OnInit {
    private static readonly MAX_LENGTH = 40;

    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue!: string;

    beschreibung!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateBeschreibungComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        this.beschreibung = new FormControl(this.currentValue, [
            Validators.maxLength(UpdateBeschreibungComponent.MAX_LENGTH),
        ]);
        this.updateForm.addControl('beschreibung', this.beschreibung);
    }
}
