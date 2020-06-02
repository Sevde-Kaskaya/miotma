import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateappPage } from './createapp.page';

const routes: Routes = [
  {
    path: '',
    component: CreateappPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateappPageRoutingModule {}
