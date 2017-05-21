import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { EmployeesService } from '../../providers/employees-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  employees;

  constructor(public navCtrl: NavController, public employeesService: EmployeesService, public alertCtrl: AlertController) { }

  ionViewDidLoad() {
    let emp = { "id": 1, "firstName": "James", "lastName": "King", "title": "President and CEO", "department": "Corporate", "managerId": 0, "city": "Boston, MA", "officePhone": "617-000-0001", "cellPhone": "781-000-0001", "email": "jking@fakemail.com", "picture": "james_king.jpg" };
    this.employeesService.addEmployee(emp);
    emp = { "id": 2, "firstName": "Julie", "lastName": "Taylor", "title": "VP of Marketing", "department": "Marketing", "managerId": 1, "city": "Boston, MA", "officePhone": "617-000-0002", "cellPhone": "781-000-0002", "email": "jtaylor@fakemail.com", "picture": "julie_taylor.jpg" };
    this.employeesService.addEmployee(emp);
    emp = { "id": 3, "firstName": "Eugene", "lastName": "Lee", "title": "CFO", "department": "Accounting", "managerId": 1, "city": "Boston, MA", "officePhone": "617-000-0003", "cellPhone": "781-000-0003", "email": "elee@fakemail.com", "picture": "eugene_lee.jpg" };
    this.employeesService.addEmployee(emp);
    emp = { "id": 4, "firstName": "John", "lastName": "Williams", "title": "VP of Engineering", "department": "Engineering", "managerId": 1, "city": "Boston, MA", "officePhone": "617-000-0004", "cellPhone": "781-000-0004", "email": "jwilliams@fakemail.com", "picture": "john_williams.jpg" };
    this.employeesService.addEmployee(emp);
    emp = { "id": 5, "firstName": "Ray", "lastName": "Moore", "title": "VP of Sales", "department": "Sales", "managerId": 1, "city": "Boston, MA", "officePhone": "617-000-0005", "cellPhone": "781-000-0005", "email": "rmoore@fakemail.com", "picture": "ray_moore.jpg" };
    this.employeesService.addEmployee(emp);
    emp = { "id": 6, "firstName": "Paul", "lastName": "Jones", "title": "QA Manager", "department": "Engineering", "managerId": 4, "city": "Boston, MA", "officePhone": "617-000-0006", "cellPhone": "781-000-0006", "email": "pjones@fakemail.com", "picture": "paul_jones.jpg" };
    this.employeesService.addEmployee(emp);
    emp = { "id": 7, "firstName": "Paula", "lastName": "Gates", "title": "Software Architect", "department": "Engineering", "managerId": 4, "city": "Boston, MA", "officePhone": "617-000-0007", "cellPhone": "781-000-0007", "email": "pgates@fakemail.com", "picture": "paula_gates.jpg" };
    this.employeesService.addEmployee(emp);
    emp = { "id": 8, "firstName": "Lisa", "lastName": "Wong", "title": "Marketing Manager", "department": "Marketing", "managerId": 2, "city": "Boston, MA", "officePhone": "617-000-0008", "cellPhone": "781-000-0008", "email": "lwong@fakemail.com", "picture": "lisa_wong.jpg" };
    this.employeesService.addEmployee(emp);
    emp = { "id": 9, "firstName": "Gary", "lastName": "Donovan", "title": "Marketing", "department": "Marketing", "managerId": 2, "city": "Boston, MA", "officePhone": "617-000-0009", "cellPhone": "781-000-0009", "email": "gdonovan@fakemail.com", "picture": "gary_donovan.jpg" };
    this.employeesService.addEmployee(emp);
    emp = { "id": 10, "firstName": "Kathleen", "lastName": "Byrne", "title": "Sales Representative", "department": "Sales", "managerId": 5, "city": "Boston, MA", "officePhone": "617-000-0010", "cellPhone": "781-000-0010", "email": "kbyrne@fakemail.com", "picture": "kathleen_byrne.jpg" };
    this.employeesService.addEmployee(emp);
    emp = { "id": 11, "firstName": "Amy", "lastName": "Jones", "title": "Sales Representative", "department": "Sales", "managerId": 5, "city": "Boston, MA", "officePhone": "617-000-0011", "cellPhone": "781-000-0011", "email": "ajones@fakemail.com", "picture": "amy_jones.jpg" };
    this.employeesService.addEmployee(emp);
    emp = { "id": 12, "firstName": "Steven", "lastName": "Wells", "title": "Software Architect", "department": "Engineering", "managerId": 4, "city": "Boston, MA", "officePhone": "617-000-0012", "cellPhone": "781-000-0012", "email": "swells@fakemail.com", "picture": "steven_wells.jpg" };
    this.employeesService.addEmployee(emp);

    // emp = { "id": 222, firstName: "Rushi", lastName: "Jukar" };
    // this.employeesService.addEmployee(emp);
    // emp = { firstName: "Aditi", lastName: "Jukar" };
    // this.employeesService.addEmployee(emp);

    this.employeesService.getEmployees()
      .then(resp => {
        this.employees = resp;
        for (var i = 0; i < this.employees.length; i++) {
          console.log(this.employees[i].doc);
        }
      });
  }

  updateEmp(employee, indx) {
    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Change name?',
      inputs: [
        {
          name: 'Surname'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            employee.lastName = data.Surname;
            this.employeesService.updateEmployee(employee)
              .then(uemp => {
                console.log(this.employees[indx].doc._rev + ">" + uemp.rev);
                this.employees[indx].doc._rev = uemp.rev;
              });
          }
        }
      ]
    });

    prompt.present();
  }

  restartAgain() {
    this.employeesService.deletDb();
    // this.employees[0].doc.firstName = 'test'
    // this.employeesService.compactDB();
  }

}
