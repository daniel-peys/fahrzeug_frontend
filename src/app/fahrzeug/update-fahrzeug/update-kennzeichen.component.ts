import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * component for the tag <code>hs-update-titel</code>
 */
@Component({
    selector: 'hs-update-kennzeichen',
    templateUrl: './update-kennzeichen.component.html',
})
export class UpdateKennzeichenComponent implements OnInit {
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue!: string;

    kennzeichen!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateKennzeichenComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        this.kennzeichen = new FormControl(this.currentValue, [
            Validators.pattern(
                /[A-ZÖÜÄ]{1,3} [A-ZÖÜÄ]{1,2} [1-9]{1}[0-9]{0,2}/u,
            ),
        ]);
        this.updateForm.addControl('kennzeichen', this.kennzeichen);
    }
}
