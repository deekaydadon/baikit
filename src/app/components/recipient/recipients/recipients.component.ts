import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.css']
})
export class RecipientsComponent implements OnInit {

  beneficiaries : any = [];

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
          }
      },
      error => {
        console.log(error);
        alert(error["error"].message);
      }
    );
  }

}
