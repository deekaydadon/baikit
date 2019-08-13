import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.css']
})
export class RecipientsComponent implements OnInit {

  beneficiaries : any = [];
  hasBeneficiary : Boolean = false;

  constructor(private dataService : DataServiceService) { 
    this.getBeneficiaries();
  }

  ngOnInit() {
    this.getBeneficiaries();
  }

  getBeneficiaries() {
    this.dataService.fetchRecipientList().subscribe(
      res => {
          console.log(res);
          if (res["status"] === true) {
            this.beneficiaries = res["data"];
            if (this.beneficiaries.length > 0) {
              this.hasBeneficiary = true;
            }
          }
      },
      error => {
        console.log(error);
        alert(error["error"].message);
      }
    );
  }

  removeBeneficiary(recipientCode) {
    this.dataService.deleteRecipient(recipientCode).subscribe(
      res => {
          if (res["status"] === true) {
            alert(res["message"]);
            this.getBeneficiaries();
          }
      },
      error => {
        alert(error["error"].message);
      }
    );
  }

}
