import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Customer1Service } from './../../Service/customer1.service';
import AdvancedJSon from '../../../assets/Advanced_Form.json';
import { ActivatedRoute, Router } from '@angular/router';

export interface Options {
  label?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  // message?: string;
  type?: string;
  children?: Array<FormControlObject>;
}

// interface for children
export interface FormControlObject {
  key: string;
  type: string;
  options: Options;
}

@Component({
  selector: 'app-customer1',
  templateUrl: './customer1.component.html',
  styleUrls: ['./customer1.component.css'],
})
export class Customer1Component implements OnInit {
  myForm: FormGroup;
  advancedForm = AdvancedJSon;

  updateId = this.aroute.snapshot.params.id;
  
  constructor(
    private fb: FormBuilder,
    private customer1Service: Customer1Service,
    private route: Router,
    private toastr: ToastrService,
    private aroute: ActivatedRoute
  ) {
   
    this.myForm = this.fb.group({});
    this.createControls(this.advancedForm);
    // console.log("form : ",this.form);
  }

  ngOnInit(): void {
    console.log(
      'My router info: - ',
      this.updateId,
      'Customer 1 service: ',
      this.customer1Service
    );
    if (this.updateId) {
      this.customer1Service.getCustomers().subscribe((list) => {
        list.map((item) => {
          if (item.key === this.updateId) {
            console.log('Form: - ', this.myForm, 'Value: - ', { ...item.payload.val(),});
            this.myForm.setValue({ ...item.payload.val() });
          }
        });
      });
    }
  }

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

  // *************************************************************

  onSubmit() {

    if (this.updateId) {
      this.customer1Service.editCustomer(this.updateId, this.myForm.value);
      console.log('Update Successfully');
      this.toastr.success('Update SuccessFully...!', 'Customer');
    } else {
      this.customer1Service.addCustomer(this.myForm.value);
      console.log('Insert');
      this.toastr.success('Added SuccessFully...!', 'Customer');
    }
    
    this.myForm.reset();

    // this.route.navigate(['/view']);
    this.route.navigate(['/view1']);
  }
}
