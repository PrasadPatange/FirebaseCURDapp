import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Service/customer.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  

  constructor(public customerService :CustomerService, private route : Router,private toastr: ToastrService) { }


  formControls = this.customerService.userForm.controls;

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.customerService.userForm.value);
  
    if(this.customerService.userForm.valid){

    
      if(this.customerService.userForm.get('$key').value == null){

        //Insert
        this.customerService.addCustomer(this.customerService.userForm.value);
      }else{
        // Edit
        this.customerService.editCustomer(this.customerService.userForm.value);
      }
      
   

        this.toastr.success('Added SuccessFully...!','Customer');
   
        this.customerService.userForm.reset();
      

    }
    this.route.navigate(["/view"]);
  }
    
}
