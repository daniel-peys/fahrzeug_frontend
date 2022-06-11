import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CreateBeschreibungComponent } from './create-beschreibung.component';
import { CreateErstzulassungComponent } from './create-erstzulassung.component';
import { CreateFahrzeugComponent } from './create-fahrzeug.component';
import { CreateFahrzeughalterComponent } from './create-fahrzeughalter.component';
import { CreateFahrzeugtypComponent } from './create-fahrzeugtyp.component';
import { CreateKennzeichenComponent } from './create-kennzeichen.component';
import { CreateKilometerstandComponent } from './create-kilometerstand.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
    imports: [
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
        SharedModule,
    ],
    declarations: [
        CreateBeschreibungComponent,
        CreateErstzulassungComponent,
        CreateFahrzeugComponent,
        CreateFahrzeughalterComponent,
        CreateFahrzeugtypComponent,
        CreateKennzeichenComponent,
        CreateKilometerstandComponent,
    ],
    exports: [
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
    ],
    providers: [Title],
})
export class CreateFahrzeugModule {}
