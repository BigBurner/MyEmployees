import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutoComplete } from './auto-complete';

@NgModule({
  declarations: [
    AutoComplete,
  ],
  imports: [
    IonicPageModule.forChild(AutoComplete),
  ],
  exports: [
    AutoComplete
  ]
})
export class AutoCompleteModule {}
