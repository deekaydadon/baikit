import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-recipient-create',
  templateUrl: './recipient-create.component.html',
  styleUrls: ['./recipient-create.component.css']
})
export class RecipientCreateComponent implements OnInit {

  bankList = [];
  selectedBankCode : String = null;
  beneficiaryForm : FormGroup;
  isCreateBeneficiaryLoading : Boolean = false;
  beneficiaryFormHasError : Boolean = false;

  constructor(private dataService: DataServiceService, private formBuilder: FormBuilder) { 
    this.fetchBankList();
  }

  ngOnInit() {
    this.beneficiaryForm = this.formBuilder.group({
      name: ['', Validators.required],
      accountNumber: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email: ['', Validators.required]
    });
  }

  get bf() {
    return this.beneficiaryForm.controls;
  }

  clearError() {
    this.beneficiaryFormHasError = false;
  }

  onSelectedBankChange(event: any) {
    this.bankList.forEach(element => {
      if(element.name == event) {
        this.selectedBankCode = element.code
        console.log("Selected "+element.name);
      }
    });
  }

  fetchBankList() {
    console.log("Call bank API...");
    this.dataService.fetchBankList().subscribe(res => {
      console.log(res);
      if (res["status"] === true) {
        this.bankList = res["data"];
        if (this.bankList.length > 0) {
          //set the first bank in the list as default
          this.selectedBankCode = this.bankList[0].code;
        }
      }
    });
  }

  createBeneficiary() {
    if (this.beneficiaryForm.invalid) {
      this.beneficiaryFormHasError = true;
      return;
    }

    this.isCreateBeneficiaryLoading = true;

    const payload = {
      type : "nuban",
      name: this.bf.name.value,
      account_number: this.bf.accountNumber.value,
      bank_code: this.selectedBankCode,
      currency: "NGN",
      email: this.bf.email.value
    }

    console.log("Calling create recipient api...");

    this.dataService.createRecipient(payload).subscribe(
      res => {
        if (res["status"] === true) {
          alert("Successfully added beneficiary");
        }
      },
      error => {
        alert(error["error"].message);
      }
    );
    
    

    this.isCreateBeneficiaryLoading = false;
    
  }
}
