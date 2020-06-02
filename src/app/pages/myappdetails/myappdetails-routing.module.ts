import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyappdetailsPage } from './myappdetails.page';

const routes: Routes = [
  {
    path: '',
    component: MyappdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyappdetailsPageRoutingModule {}
