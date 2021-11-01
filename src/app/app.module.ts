import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { CustomerlistComponent } from './Components/customerlist/customerlist.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './Service/customer.service';
import {Customer1Service} from './Service/customer1.service'
// import { ToastrModule} from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './Components/footer/footer.component';
import { Customer1Component } from './Components/customer1/customer1.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Customerlist1Component } from './Components/customerlist1/customerlist1.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomerComponent,
    CustomerlistComponent,
    FooterComponent,
    Customer1Component,
    Customerlist1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot()
  
  ],
  providers: [CustomerService,Customer1Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
