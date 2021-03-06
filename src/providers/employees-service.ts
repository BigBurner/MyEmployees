import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as PouchDB from 'pouchdb';
import * as PouchDBFind from 'pouchdb-find';

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
    PouchDB.plugin(PouchDBFind);

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
      this.db.allDocs({ startkey: 'emp:', endkey: 'emp:\uffff', include_docs: true })
        .then(result => {
          console.log(result.rows.length);
          return resolve(result.rows);
        })

    })
  }

  getEmployee(empId: String): Promise<any> {
    console.log('called'+empId)
    return this.db.get(empId);
  }

  addEmployee(employee): Promise<any> {
    return new Promise((resolve, reject) => {
      employee.type = "Employee";
      employee._id = "emp:" + employee.firstName + employee.lastName;

      this.db.get(employee._id)
        .then(emp => {
          console.log("got emp, so not creating, try update")
          return resolve(emp);
        })
        .catch(resp => {
          console.log("creating emp")
          if(!employee.picture){
            employee.picture = "placeholder.jpg"
          }
          this.db.put(employee)
          .then(emp => {
            console.log("returning new emp")
            return resolve(emp)
          });
        });
      // return reject("did not do anything");
    });
  }

  updateEmployee(employee): Promise<any> {
    return this.db.put(employee);
  }

  addPhotoToEmployee(employee) {

  }

  handleChange(change) {

  }

  getReportsCount(empId) : Promise<any>{
    console.log("empdi"+empId);
    return this.db.find({
      selector: {
        managerId: empId
      }
    });
  }

  addIndex(){
    this.db.createIndex({
      index: {
        fields: ['managerId']
      }
    }).then(function (result) {
      console.log(result);
    }).catch(function (err) {
      console.log(err);
    });

    this.db.find({
      selector: {
        managerId: 'emp:JamesKing'
      }
    }).then((res) => {
      console.log(res.docs.length);
    });

    var ddoc = {
      _id: '_design/mgrIndex',
      views: {
        byMgr: {
          map: function mapFun(doc,emit) {
            if (doc.managerId) {
              emit(doc.managerId);
            }
          }.toString()
        }
      }
    }

    this.db.put(ddoc).catch(function (err) {
      if (err.name !== 'conflict') {
        throw err;
      }
      // ignore if doc already exists
      });

    this.db.query('mgrIndex/byMgr').then( (result) => {
    console.log(result);
    });
  }

  deletDb(){
    this.db.destroy();
  }

  compactDB(){
    this.db.compact();
  }
}
