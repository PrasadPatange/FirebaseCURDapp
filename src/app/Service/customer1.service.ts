import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class Customer1Service {
  customerList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase, private route: Router) {
    this.customerList = this.firebase.list('customers');
    // console.log("ON constructor: - ", this.customerList);
  }

  getCustomers() {
    this.customerList = this.firebase.list('customers');
    return this.customerList.snapshotChanges();
  }

  addCustomer(customer) {
    console.log('My Customer: - ', customer, this.customerList);
    this.customerList.push({
      ...customer,
    });
  }
  editCustomer(key, customer) {
    console.log('Edit customer data: - ', customer);
    return this.customerList.update(key, {
      ...customer,
    });
    // return Promise.reject("Not availble");
  }
  deleteCustomer($key: string) {
    this.customerList.remove($key);
  }
}
