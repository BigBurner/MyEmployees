import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmployeesService } from '../../providers/employees-service';


/**
 * Generated class for the EmpEdit page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-emp-edit',
  templateUrl: 'emp-edit.html',
})
export class EmpEdit {

  private employee: FormGroup;
  private empParam;
  public formChanged: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder
  	, public employeesService: EmployeesService, private toastCtrl: ToastController) {
  	this.empParam = navParams.get("currEmp");
  	let emp = { "_id": "", "_rev": ""
  			  , "firstName": ""
  			  , "lastName": "", "title": "", "department": ""
  			  , "managerId": "", "city": "", "officePhone": ""
  			  , "cellPhone": "", "email": "", "picture": "" 
  			  };

  	if (this.empParam){
	  	emp = this.empParam.doc;
	  	console.log(emp);
  	}
  	this.employee = this.formBuilder.group({
  		id: [emp._id],
		title: [emp.title, Validators.required],
		firstName: [emp.firstName, Validators.required],
		lastName: [emp.lastName, Validators.required],
		department: [emp.department],
		managerId: [emp.managerId],
		city: [emp.city],
		officePhone: [emp.officePhone],
		cellPhone: [emp.cellPhone],
		email: [emp.email]
  	})

  	this.employee.valueChanges.subscribe(data => {
      console.log('Form changes', data)
      this.formChanged = true;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpEdit');
  }

  saveEmployee(){
  	console.log(this.employee.value);
	this.empParam.doc.firstName = this.employee.value.firstName
	this.empParam.doc.lastName = this.employee.value.lastName
	this.empParam.doc.title = this.employee.value.title
	this.empParam.doc.department = this.employee.value.department
	this.empParam.doc.managerId = this.employee.value.managerId
	this.empParam.doc.city = this.employee.value.city
	this.empParam.doc.officePhone = this.employee.value.officePhone
	this.empParam.doc.cellPhone = this.employee.value.cellPhone
	this.empParam.doc.email = this.employee.value.email
	// this.empParam._id = this.empParam.id
	console.log(this.empParam);
  	this.employeesService.updateEmployee(this.empParam.doc)
  	.then(uemp => {
	  console.log(this.empParam.doc._rev + ">" + uemp.rev);
	  this.empParam.doc._rev = uemp.rev;
	  this.presentToast();
	});
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was saved successfully',
      duration: 3000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      this.navCtrl.pop();
    });
  
    toast.present();
  }

  submitForm(formx){
  	console.log(formx)
  }
}
