import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ClockpageComponent } from './clockpage/clockpage.component';
import { PayrollpageComponent } from './payrollpage/payrollpage.component';
import { DeductionpageComponent } from './deductionpage/deductionpage.component';
import { AdditionpageComponent } from './additionpage/additionpage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { UserspageComponent } from './userspage/userspage.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: ClockpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
