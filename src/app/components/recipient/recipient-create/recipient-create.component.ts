import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-recipient-create',
  templateUrl: './recipient-create.component.html',
  styleUrls: ['./recipient-create.component.css']
})
export class RecipientCreateComponent implements OnInit {

  bankList = [];

  constructor(private dataService: DataServiceService) { 
    this.fetchBankList();
  }

  ngOnInit() {
  }

  onSelectedBankChange(e) {

  }

  fetchBankList() {
    console.log("Call bank API...");
    this.dataService.fetchBankList().subscribe(res => {
      console.log(res);
      if (res["status"] === true) {
        this.bankList = res["data"];
      }
    });
  }
}
