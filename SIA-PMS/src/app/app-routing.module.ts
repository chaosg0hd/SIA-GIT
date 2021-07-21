import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { DashboardpageComponent } from './index/pages/dashboardpage/dashboardpage.component';
import { EmployeepageComponent } from './index/pages/employeepage/employeepage.component';
import { DeductionpageComponent } from './index/pages/deductionpage/deductionpage.component';
import { AdditionpageComponent } from './index/pages/additionpage/additionpage.component';
import { WagespageComponent } from './index/pages/wagespage/wagespage.component';
import { LoginComponent } from './login/login.component';
import { TimeinComponent } from './timein/timein.component';
import { AttendancepageComponent } from './index/pages/attendancepage/attendancepage.component';
import { DailytimerecordpageComponent } from './index/pages/dailytimerecordpage/dailytimerecordpage.component';
import { PayrollpageComponent } from './index/pages/payrollpage/payrollpage.component';
import { SalarypageComponent } from './index/pages/salarypage/salarypage.component';
import { UserpageComponent } from './index/pages/userpage/userpage.component';
import { MyprofilepageComponent } from './index/pages/myprofilepage/myprofilepage.component';
import { MasterpageComponent } from './index/pages/masterpage/masterpage.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

 /* { path: '', redirectTo: 'timein', pathMatch: 'full' },*/

  { path: 'timein', component: TimeinComponent },

  {
    path: 'home', component: IndexComponent, children:
      [        
        { path: '', component: DashboardpageComponent },
      ]
  },
  {
    path: 'salary', component: IndexComponent, children:
      [
        { path: '', component: SalarypageComponent },
      ]
  },
  {
    path: 'employee', component: IndexComponent,
    children: [
      { path: '', component: EmployeepageComponent }
    ]
  },
  {
    path: 'deduction', component: IndexComponent,
    children: [
      { path: '', component: DeductionpageComponent }
    ]
  },
  {
    path: 'addition', component: IndexComponent,
    children: [
      { path: '', component: AdditionpageComponent }
    ]
  },
  {
    path: 'wages', component: IndexComponent,
    children: [
      { path: '', component: WagespageComponent }
    ]
  },
  {
    path: 'attendance', component: IndexComponent,
    children: [
      { path: '', component: AttendancepageComponent }
    ]
  },

  {
    path: 'dailytimerecord', component: IndexComponent,
    children: [
      { path: '', component: DailytimerecordpageComponent }
    ]
  },
  {
    path: 'payroll', component: IndexComponent,
    children: [
      { path: '', component: PayrollpageComponent }
    ]
  },
  {
    path: 'user', component: IndexComponent,
    children: [
      { path: '', component: UserpageComponent }
    ]
  },
  {
    path: 'myprofile', component: IndexComponent,
    children: [
      { path: '', component: MyprofilepageComponent }
    ]
  },
  {
    path: 'master', component: IndexComponent,
    children: [
      { path: '', component: MasterpageComponent }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
