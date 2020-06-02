import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyappdetailsPageRoutingModule } from './myappdetails-routing.module';

import { MyappdetailsPage } from './myappdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyappdetailsPageRoutingModule
  ],
  declarations: [MyappdetailsPage]
})
export class MyappdetailsPageModule {}
