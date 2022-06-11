import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * component with the tag <hs-create-preis>
 */
@Component({
    selector: 'hs-create-kilometerstand',
    templateUrl: './create-kilometerstand.component.html',
})
export class CreateKilometerstandComponent implements OnInit {
    private static readonly MIN = 0;

    // eslint-disable-next-line unicorn/numeric-separators-style
    private static readonly MAX = 9999999;

    @Input()
    createForm!: FormGroup;

    readonly kilometerstand = new FormControl(undefined, [
        Validators.min(CreateKilometerstandComponent.MIN),
        Validators.max(CreateKilometerstandComponent.MAX),
    ]);

    ngOnInit() {
        log.debug('CreateKilometerstandComponent.ngOnInit');
        this.createForm.addControl('kilometerstand', this.kilometerstand);
    }
}
