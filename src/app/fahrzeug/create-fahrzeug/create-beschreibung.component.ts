/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable array-bracket-newline */
import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * component with the tag <hs-create-titel>
 */
@Component({
    selector: 'hs-create-beschreibung',
    templateUrl: './create-beschreibung.component.html',
})
export class CreateBeschreibungComponent implements OnInit {
    private static readonly MAX_LENGTH = 40;

    @Input()
    createForm!: FormGroup;

    readonly beschreibung = new FormControl(undefined, [
        Validators.maxLength(CreateBeschreibungComponent.MAX_LENGTH),
    ]);

    ngOnInit() {
        log.debug('CreateBeschreibungComponent.ngOnInit');
        this.createForm.addControl('beschreibung', this.beschreibung);
    }
}
