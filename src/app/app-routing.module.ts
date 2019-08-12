import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RecipientsComponent } from './components/recipient/recipients/recipients.component';
import { RecipientCreateComponent } from './components/recipient/recipient-create/recipient-create.component';
import { RecipientUpdateComponent } from './components/recipient/recipient-update/recipient-update.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'recipient', children: [
    {path: '', component: RecipientsComponent, pathMatch: 'full'},
    {path: 'create', component: RecipientCreateComponent, pathMatch: 'full'},
    {path: 'update', component: RecipientUpdateComponent, pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
