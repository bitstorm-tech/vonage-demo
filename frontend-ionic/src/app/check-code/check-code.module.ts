import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckCodePageRoutingModule } from './check-code-routing.module';

import { CheckCodePage } from './check-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckCodePageRoutingModule
  ],
  declarations: [CheckCodePage]
})
export class CheckCodePageModule {}
