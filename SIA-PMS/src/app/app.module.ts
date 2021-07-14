import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//App Modules

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

//Font Awesome

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Calender Module

import { DatePipe } from '@angular/common';
//import { FlatpickrModule } from 'angularx-flatpickr';
//import { CalendarModule, DateAdapter } from 'angular-calendar';
//import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
//import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

//Material Modules

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';

// Material Navigation

import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

// Material Layout

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';

// Material Buttons & Indicators

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';

// Material Popups & Modals

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Material Data tables

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

// Component Modules

import { IndexComponent } from './index/index.component';
import { EmployeepageComponent } from './index/pages/employeepage/employeepage.component';
import { DeductionpageComponent } from './index/pages/deductionpage/deductionpage.component';
import { AdditionpageComponent } from './index/pages/additionpage/additionpage.component';
import { WagespageComponent } from './index/pages/wagespage/wagespage.component';
import { LoginComponent } from './login/login.component';
import { DashboardpageComponent } from './index/pages/dashboardpage/dashboardpage.component';
import { AttendancepageComponent } from './index/pages/attendancepage/attendancepage.component';
import { PayrollpageComponent } from './index/pages/payrollpage/payrollpage.component';
import { MasterpageComponent } from './index/pages/masterpage/masterpage.component';

//Dialog Modules

import { EditemployeeDialog } from './index/pages/employeepage/employeepage.component';
import { AddemployeeDialog } from './index/pages/employeepage/employeepage.component';
import { SalarypageComponent } from './index/pages/salarypage/salarypage.component';
import { TimeinpageComponent } from './index/pages/timeinpage/timeinpage.component';




@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    EmployeepageComponent,
    DeductionpageComponent,
    AdditionpageComponent,
    WagespageComponent,
    LoginComponent,
    DashboardpageComponent,
    AttendancepageComponent,
    PayrollpageComponent,
    MasterpageComponent,

    EditemployeeDialog,
    AddemployeeDialog,
    SalarypageComponent,
    TimeinpageComponent,
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

    HttpClientModule,

    FontAwesomeModule,

    //NgbModalModule,
    //FlatpickrModule.forRoot(),
    //CalendarModule.forRoot({
    //  provide: DateAdapter,
    //  useFactory: adapterFactory,
    //}),

    // Material Cons Imports

    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [
    EditemployeeDialog,
    AddemployeeDialog,
  ]
})
export class AppModule { }
