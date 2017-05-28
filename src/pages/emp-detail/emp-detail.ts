import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.employee = navParams.get("currEmp");
  	console.log(this.employee);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpDetail');
  }

}
