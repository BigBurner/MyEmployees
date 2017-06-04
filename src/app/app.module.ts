import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { AutoComplete } from '../components/auto-complete/auto-complete'
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { EmpDetail } from '../pages/emp-detail/emp-detail';
import { EmpEdit } from '../pages/emp-edit/emp-edit';
import { EmployeesService } from '../providers/employees-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    EmpDetail,
    EmpEdit,
    AutoComplete
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    EmpDetail,
    EmpEdit
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmployeesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
