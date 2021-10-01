import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentComponent } from './component/component.component';
import { ComponentinnerComponent } from './componentinner/componentinner.component';

const routes: Routes = [

  {
    path: '', component: ComponentComponent,
    children: [
      { path: '', component: ComponentinnerComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
