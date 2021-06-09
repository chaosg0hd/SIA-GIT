import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { DashboardpageComponent } from './index/pages/dashboardpage/dashboardpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeepageComponent } from './index/pages/employeepage/employeepage.component';
import { DeductionpageComponent } from './index/pages/deductionpage/deductionpage.component';
import { AdditionpageComponent } from './index/pages/additionpage/additionpage.component';
import { WagespageComponent } from './index/pages/wagespage/wagespage.component';
import { LoginComponent } from './login/login.component';
import { AttendancepageComponent } from './index/pages/attendancepage/attendancepage.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home', component: IndexComponent, children:
      [        
        { path: '', component: DashboardpageComponent },
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
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
