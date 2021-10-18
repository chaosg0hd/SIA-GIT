import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestComponent } from './test/test.component';

import { BundyComponent } from './bundy/bundy.component';

import { InterfaceComponent } from './interface/interface.component';
import { HomeComponent } from './home/home.component';
import { HrComponent } from './hr/hr.component';


const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'test', component: TestComponent
  },

  {
    path: 'bundy', component: BundyComponent
  },

  {
    path: 'home', component: InterfaceComponent, children:
      [
        { path: '', component: HomeComponent },
      ]
  },

  {
    path: 'hr', component: InterfaceComponent, children:
      [
        { path: '', component: HrComponent },
      ]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
