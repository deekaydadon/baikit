import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  balance : any = 0;

  constructor(private dataService : DataServiceService) { 
    this.getBalance();
  }

  ngOnInit() {
  }

  getBalance() {
    this.dataService.fetchBalance().subscribe(
      res => {
          console.log(res["data"][0]);
          if (res["status"] === true) {
            if (res["data"].length > 0) {
              this.balance = res["data"][0];
            }
          }
      },
      error => {
        console.log(error);
        alert(error["error"].message);
      }
    );
  }

}
