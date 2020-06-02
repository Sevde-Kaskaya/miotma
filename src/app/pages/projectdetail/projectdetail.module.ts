import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectdetailPageRoutingModule } from './projectdetail-routing.module';

import { ProjectdetailPage } from './projectdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectdetailPageRoutingModule
  ],
  declarations: [ProjectdetailPage]
})
export class ProjectdetailPageModule {}
