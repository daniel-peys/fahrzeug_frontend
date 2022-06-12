import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * component for the tag <code>hs-update-rating</code>
 */
@Component({
    selector: 'hs-update-kilometerstand',
    templateUrl: './update-kilometerstand.component.html',
})
export class UpdateKilometerstandComponent implements OnInit {
    private static readonly MIN = 0;

    // eslint-disable-next-line unicorn/numeric-separators-style
    private static readonly MAX = 9999999;

    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue: number | undefined;

    kilometerstand!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateRatingComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        this.kilometerstand = new FormControl(this.currentValue, [
            Validators.min(UpdateKilometerstandComponent.MIN),
            Validators.max(UpdateKilometerstandComponent.MAX),
        ]);
        this.updateForm.addControl('kilometerstand', this.kilometerstand);
    }
}
