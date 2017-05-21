import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';

/*
  Generated class for the EmployeesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EmployeesService {
  data: any;
  db: any;
  remote: any;


  constructor() {
    console.log('Hello EmployeesService Provider');
    this.db = new PouchDB('Emps', { adapter: 'websql', size: 55 });

    // this.remote = 'http://localhost:5984/cloudo';
    // let options = {
    //   live: true,
    //   retry: true,
    //   continuous: true
    // };
    // this.db.sync(this.remote, options);
  }


  getEmployees(): Promise<any> {
    return new Promise((resolve,reject) => {
      this.db.allDocs({ include_docs: true })
        .then(result => {
          console.log(result.total_rows);
          return resolve(result.rows);
        })

    })
  }

  addEmployee(employee) {
    employee.type = "Employee";
    employee._id = "emp:" + employee.firstName + employee.lastName;

    this.db.get(employee._id)
      .then(emp => {
      })
      .catch(resp => {
        this.db.put(employee);
        console.log("creating emp")
      });
  }

  updateEmployee(employee): Promise<any> {
    return this.db.put(employee);
    // .then(resp =>{
    //   return resp;
    // });
  }

  addPhotoToEmployee(employee) {

  }

  handleChange(change) {

  }

  deletDb(){
    this.db.destroy();
  }

  compactDB(){
    this.db.compact();
  }
}
