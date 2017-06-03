import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmployeesService } from '../../providers/employees-service';

/**
 * Generated class for the EmpDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-emp-detail',
  templateUrl: 'emp-detail.html',
})
export class EmpDetail {
	employee: any;
	mgrEmployee: any;
  callback: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public employeesService: EmployeesService) {
  	this.employee = navParams.get("currEmp");
    this.callback = this.navParams.get("callback")
  	
  	console.log(this.employee);
  	if (this.employee.doc.managerId != 0) {
	    this.employeesService.getEmployee(this.employee.doc.managerId)
	    .then(emp => {
	    	this.mgrEmployee = emp;
	    });	
  	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpDetail');
  }

  ionViewWillLeave(){
    //not used but a way to pass param to calling page
    this.callback("hello")
  }
}
