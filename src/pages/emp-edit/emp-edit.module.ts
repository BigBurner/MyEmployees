import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpEdit } from './emp-edit';

@NgModule({
  declarations: [
    EmpEdit,
  ],
  imports: [
    IonicPageModule.forChild(EmpEdit),
  ],
  exports: [
    EmpEdit
  ]
})
export class EmpEditModule {}
