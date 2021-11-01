import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators,FormGroup,FormControlName, FormControl } from '@angular/forms';
import { AngularFireDatabase,AngularFireList} from '@angular/fire/database';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerList : AngularFireList<any>;

  constructor(private firebase : AngularFireDatabase , private route: Router) {
    this.customerList = this.firebase.list('customers');
    // console.log("ON constructor: - ", this.customerList);
  }
  

  userForm = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z]+\\s[A-Za-z]+$')]),
    email: new FormControl('',[Validators.required,Validators.email,Validators.pattern('\\S+@\\S+\\.\\S+')]),
    phone: new FormControl('',[Validators.required,Validators.pattern('^(\\+91[\\-\\s]?)?[0]?(91)?[789]\\d{9}$')]),
    age: new FormControl('',[Validators.required,Validators.pattern('^[1-9][0-9]?$|^100$')]),

  });

  getCustomers(){
    this.customerList = this.firebase.list('customers');
    return this.customerList.snapshotChanges();
  }

  addCustomer(customer){
    console.log("My Customer: - ", customer, this.customerList);
    this.customerList.push({
      name:customer.name,
      email:customer.email,
      phone:customer.phone,
      age:customer.age
    });
  }


  editCustomer(customer){
    
    this.userForm.setValue(customer);
    this.customerList.update(customer.$key,
      {
        name:customer.name,
        email:customer.email,
        phone:customer.phone,
        age:customer.age,
      });
      // this.route.navigate(['/add']);
      this.route.navigate(['/add1']);

  }
  deleteCustomer($key : string){

    this.customerList.remove($key);

  }

}
