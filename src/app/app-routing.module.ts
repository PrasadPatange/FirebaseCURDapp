import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './Components/customer/customer.component';
import { Customer1Component } from './Components/customer1/customer1.component';
import { CustomerlistComponent } from './Components/customerlist/customerlist.component';
import { Customerlist1Component } from './Components/customerlist1/customerlist1.component';

const routes: Routes = [
  // {
  //   path:'add',component:CustomerComponent
  // },
  {
    path:'',redirectTo:'add1',pathMatch:'full'
  },
  {
    path:'add1',component:Customer1Component
  },
  // {
  //   path:'view',component:CustomerlistComponent
  // },
  {
    path:'view1',component:Customerlist1Component
  },
  // {
  //   path:'update/:id',component:Customer1Component
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
