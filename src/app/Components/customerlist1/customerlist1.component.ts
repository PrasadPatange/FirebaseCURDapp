import { Component, OnInit ,TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Service/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Customer1Service } from 'src/app/Service/customer1.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

// Form
import {FormArray,FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import AdvancedJSon from '../../../assets/Advanced_Form.json';


export interface Options {
  label?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  type?: string;
  children?: Array<FormControlObject>;
}

// interface for children
export interface FormControlObject {
  key: string;
  type: string;
  options: Options;
}

// 

@Component({
  selector: 'app-customerlist1',
  templateUrl: './customerlist1.component.html',
  styleUrls: ['./customerlist1.component.css']
})
export class Customerlist1Component implements OnInit {
  
  // form 
  myForm: FormGroup;
  advancedForm = AdvancedJSon;
  
  updateId = "";
  
  // **************
  constructor(public customerService :CustomerService ,
              public customer1Service:Customer1Service,
              private route: Router,
              private toastr: ToastrService,
              private modalService: BsModalService,
              private fb: FormBuilder,
              ) 
            {
                this.myForm = this.fb.group({});
                this.createControls(this.advancedForm);
                // console.log("form : ",this.form);
            }
  
  // ***************************************************************
  customerArray = [];
 
  ngOnInit(): void {
  
    this.customer1Service.getCustomers().subscribe( list =>{
      this.customerArray = list.map(item =>{
      
        return{
          $key : item.key,
          ...item.payload.val()
        };
      });

      // console.log("My custom array from firebase: - ", this.customerArray);
    });
    
  }

 
  
  //********************** Modal *************************
  modalRef?: BsModalRef;

  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  openModal(template: TemplateRef<any>, customer) {

    console.log("Modal customer: - ", customer);

    this.myForm.setValue({Address: customer.Address, Phone: customer.Phone});

    this.updateId = customer.$key;

  // this.modalRef = this.modalService.show(template);
  // for disable background
    this.modalRef = this.modalService.show(template, this.config);
    
  }
//*********************** Dynamic Form **********************

createControls(controls: Array<FormControlObject>) {
  for (let control of controls) {
    // key, type, options

    if (control.type == 'group') {
      const newGroup = new FormGroup({});
      control.options.children.map((child) => {
        const newControl = new FormControl();

        // Validation
        if (child.options.required) {
          newControl.setValidators(Validators.required);
          console.log('my test control: - ', newControl.valid);
        }
        newGroup.addControl(child.key, newControl);
      });
      this.myForm.addControl(control.key, newGroup);
    } else if (control.type == 'array') {
      const newArray = new FormArray([]);

      const oneGroup = new FormGroup({});
      control.options.children.map((child) => {
        const newControl = new FormControl();

        if (child.options.required) {
          newControl.setValidators(Validators.required);
        }

        oneGroup.addControl(child.key, newControl);
      });

      newArray.push(oneGroup);
      this.myForm.addControl(control.key, newArray);
    }
  }
}
getFormArray(key) {
  return <FormArray>this.myForm.controls[key];
}

addArrayGroup(ArrayName, ObjSchemaChild) {
  const control = this.getFormArray(ArrayName);
  const oneGroup = new FormGroup({});
  ObjSchemaChild.map((child) => {
    oneGroup.addControl(child.key, new FormControl());
  });
  control.push(oneGroup);
  // console.log("oneGroup:-",oneGroup)
}

removeArrayGroup(arrayName, index) {
  const control = this.getFormArray(arrayName);
  control.removeAt(index);
}

// ************************************************************8
onSubmit(modalRef) {
  
  console.log("Updated Value: - ", this.myForm.value, this.updateId);

  this.customer1Service.editCustomer(this.updateId, this.myForm.value).then(() => {
    modalRef.hide();
    this.toastr.success('Update SuccessFully...!', 'Customer');
    this.myForm.reset();
  }).catch((err) => {
    this.toastr.error('Got Error!', 'Customer');
  });

  this.route.navigate(['/view1']);
}
// ****************************
  delete($key){

    this.toastr.success('Deleted SuccessFully...!','Customer');
    if(confirm("Are You Want to Delete This Record ?")){
      this.customerService.deleteCustomer($key);
  }

  }
  
  add(){

    this.route.navigate(['/add1']);
  }
}
