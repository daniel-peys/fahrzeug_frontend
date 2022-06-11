import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * component for the tag <hs-create-datum>
 */
@Component({
    selector: 'hs-create-erstzulassung',
    templateUrl: './create-erstzulassung.component.html',
})
export class CreateErstzulassungComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly today = new Date();

    readonly erstzulassung = new FormControl(this.today);

    ngOnInit() {
        log.debug('CreateErstzulassungComponent.ngOnInit');
        this.createForm.addControl('erstzulassung', this.erstzulassung);
    }

    dayClicked({ date }: { date: Date }): void {
        log.debug('CreateDatumComponent: dayClicked', date);
        this.createForm.setControl('erstzulassung', new FormControl(date));
    }
}
