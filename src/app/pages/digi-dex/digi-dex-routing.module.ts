import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DigiDexPage } from './digi-dex.page';

const routes: Routes = [
  {
    path: '',
    component: DigiDexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigiDexPageRoutingModule {}
