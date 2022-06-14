import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * component with the tag <hs-create-titel>
 */
@Component({
    selector: 'hs-create-kennzeichen',
    templateUrl: './create-kennzeichen.component.html',
})
export class CreateKennzeichenComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly kennzeichen = new FormControl(undefined, [
        Validators.required,
        Validators.pattern(/[A-ZÖÜÄ]{1,3} [A-ZÖÜÄ]{1,2} [1-9]{1}\d{0,2}/u),
    ]);

    ngOnInit() {
        log.debug('CreateKennzeichenComponent.ngOnInit');
        this.createForm.addControl('kennzeichen', this.kennzeichen);
    }
}
