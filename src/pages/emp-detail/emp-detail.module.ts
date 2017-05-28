import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpDetail } from './emp-detail';

@NgModule({
  declarations: [
    EmpDetail,
  ],
  imports: [
    IonicPageModule.forChild(EmpDetail),
  ],
  exports: [
    EmpDetail
  ]
})
export class EmpDetailModule {}
