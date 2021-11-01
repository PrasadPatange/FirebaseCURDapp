import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Service/customer.service';

import { ToastrService } from 'ngx-toastr';
import { Customer1Service } from 'src/app/Service/customer1.service';


@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {

  constructor(public customerService :CustomerService ,
              public customer1Service:Customer1Service,
              private route: Router,
              private toastr: ToastrService
              ) { 

  }

  
  customerArray = [];
 
  ngOnInit(): void {
    this.customer1Service.getCustomers().subscribe( list =>{
      this.customerArray = list.map(item =>{
        return{
          $key : item.key,
          ...item.payload.val()
        };
      });

      console.log("My custom array from firebase: - ", this.customerArray);
    });
  }

  delete($key){

    this.toastr.success('Deleted SuccessFully...!','Customer');
    if(confirm("Are You Want to Delete This Record ?")){
      this.customerService.deleteCustomer($key);
  }

  }

  edit(customer) {
    console.log("After edit Customer: - ", customer);
    this.route.navigate([`update/${customer.$key}`]);
  }

  add(){

    this.route.navigate(['/add']);
  }
}
