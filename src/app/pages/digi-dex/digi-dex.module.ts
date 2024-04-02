import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DigiDexPageRoutingModule } from './digi-dex-routing.module';

import { DigiDexPage } from './digi-dex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DigiDexPageRoutingModule
  ],
  declarations: [DigiDexPage]
})
export class DigiDexPageModule {}
