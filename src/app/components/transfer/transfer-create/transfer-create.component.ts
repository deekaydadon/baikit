import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-create',
  templateUrl: './transfer-create.component.html',
  styleUrls: ['./transfer-create.component.css']
})
export class TransferCreateComponent implements OnInit {

  beneficiaries : any = [];
  recipientForm : FormGroup;
  selectedBeneficiary : any = null;
  recipientFormHasError : Boolean = false;

  recipientList : any = [];
  totalAmount : Number = 0;
  uniqueId = 0;
  hasSelectedRecipient : Boolean = false;
  isBulkTransfer : Boolean = false;

  sendMoneyLoading : Boolean = false;
  

  constructor(private dataService : DataServiceService,  private formBuilder: FormBuilder) {
    this.getBeneficiaries();
    this.recipientForm = this.formBuilder.group({
      amount: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  get rf() {
    return this.recipientForm.controls;
  }

  clearError() {
    this.recipientFormHasError = false;
  }

  onBeneficiary(event: any) {
    this.beneficiaries.forEach(element => {
      if (element.recipient_code === event) {
        this.selectedBeneficiary = element;
      }
    });
  }

  getBeneficiaries() {
    this.dataService.fetchRecipientList().subscribe(
      res => {
          console.log(res);
          if (res["status"] === true) {
            if (res["data"].length > 0) {
              this.beneficiaries = res["data"];
              this.selectedBeneficiary = this.beneficiaries[0];
            }
          }
      },
      error => {
        console.log(error);
        alert(error["error"].message);
      }
    );
  }

  addRecipient() {
    if (this.recipientForm.invalid) {
      this.recipientFormHasError = true;
      return;
    }

    this.uniqueId++; //unique id for each recpient added

    const recipient = {
      amount: this.rf.amount.value,
      accountNumber: this.selectedBeneficiary.details.account_number,
      bankName: this.selectedBeneficiary.details.bank_name,
      bankCode: this.selectedBeneficiary.details.bank_code,
      name: this.selectedBeneficiary.name,
      recipientCode: this.selectedBeneficiary.recipient_code,
      id : this.uniqueId,
    }

    //sum total transfer amount
    this.totalAmount = Number(this.totalAmount + recipient.amount);

    //add to recipient list
    this.recipientList.push(recipient);
    this.hasSelectedRecipient = true;
    this.detectBulkTransfer();

    console.log("Recipient list:");
    console.log(this.recipientList);

  }

  removeRecipient(id : any) {
    console.log("Remove", id);
    const newList = [];
    var newTotal : Number = 0;
    this.hasSelectedRecipient = false;

    this.recipientList.forEach(element => {
      if (element.id !== id) {
        newList.push(element);
        this.hasSelectedRecipient = true;
        newTotal = Number(newTotal + element.amount);
      }
    });

    this.recipientList = [...newList];
    this.detectBulkTransfer();
    this.totalAmount = newTotal;
  }

  detectBulkTransfer() {
    this.isBulkTransfer = (this.recipientList.length > 1);
  }


  sendMoney() {
    if (this.recipientList.length < 1) { 
      alert("Kindly select a recipient"); 
      return;
    }
    
    this.isBulkTransfer? this.sendBulkTransfer() : this.sendSingleTransfer();
  }

  sendSingleTransfer() {
    this.sendMoneyLoading = true;

    const payload = {
      source: "balance",
      amount: this.recipientList[0].amount * 100,
      currency: "NGN",
      reason: "No reason",
      recipient: this.recipientList[0].recipientCode
    };

    this.dataService.initiateSingleTransfer(payload).subscribe(
      res => {
        if (res["status"] === true) {
          alert(res["message"]);
          location.reload();
        }
    },
    error => {
      alert(error["error"].message);
    }
    );

    this.sendMoneyLoading = false;
  }

  sendBulkTransfer() {
    this.sendMoneyLoading = true;

    const transfers = [];

    this.recipientList.forEach(element => {
      const info = {
        amount: element.amount * 100,
        recipient: element.recipientCode
      }
      transfers.push(info);
    });

    const payload = {
      source: "balance",
      amount: this.recipientList[0].amount * 100,
      currency: "NGN",
      transfers
    };

    this.dataService.initiateBulkTransfer(payload).subscribe(
      res => {
        if (res["status"] === true) {
          alert(res["message"]);
          location.reload();
        }
    },
    error => {
      alert(error["error"].message);
    }
    );

    this.sendMoneyLoading = false;
  }
}
