import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RecipientCreateComponent } from './components/recipient/recipient-create/recipient-create.component';
import { RecipientUpdateComponent } from './components/recipient/recipient-update/recipient-update.component';
import { RecipientsComponent } from './components/recipient/recipients/recipients.component';
import { TransferCreateComponent } from './components/transfer/transfer-create/transfer-create.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecipientCreateComponent,
    RecipientUpdateComponent,
    RecipientsComponent,
    TransferCreateComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
