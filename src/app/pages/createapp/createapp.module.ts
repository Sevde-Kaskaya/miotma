import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateappPageRoutingModule } from './createapp-routing.module';

import { CreateappPage } from './createapp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateappPageRoutingModule
  ],
  declarations: [CreateappPage]
})
export class CreateappPageModule {}
