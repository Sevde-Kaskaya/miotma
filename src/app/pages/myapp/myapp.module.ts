import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyappPageRoutingModule } from './myapp-routing.module';

import { MyappPage } from './myapp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyappPageRoutingModule
  ],
  declarations: [MyappPage]
})
export class MyappPageModule {}
