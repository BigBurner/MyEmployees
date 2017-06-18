import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmployeesService } from '../../providers/employees-service';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  newpicture: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, public employeesService: EmployeesService, private camera: Camera) {
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

  getPicFromCamera(){
    const options: CameraOptions = {
        quality: 75,
        destinationType: this.camera.DestinationType.NATIVE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 500,
        targetHeight: 500,
        cameraDirection: 1,
        correctOrientation: true       
      }
    this.camera.getPicture(options).then((imageURL) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      if (imageURL) {
        console.log("url"+imageURL);
        this.newpicture = imageURL
        this.employee.picture = imageURL;        
      }
    }, (err) => {
       console.log(err);
    });
  }
}
