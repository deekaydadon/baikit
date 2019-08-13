import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  baseUrl: any;
  httpOptions: any; 

  constructor(private http: HttpClient) {
    this.setHttpHeader();
   }

  ngOnInit() {
    this.setHttpHeader();
  }

  setHttpHeader() {
    this.baseUrl = environment.apiBaseUrl;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${environment.paystackSecretKey}`
      })
    };
    this.http.options = this.httpOptions;
  }

  fetchBankList() {
    return this.http.get(`${this.baseUrl}bank`);
  }

  createRecipient(obj) {
    return this.http.post(`${this.baseUrl}transferrecipient`, obj, this.httpOptions);
  }

  fetchRecipientList() {
    return this.http.get(`${this.baseUrl}transferrecipient`, this.httpOptions);
  }

  initiateSingleTransfer(obj) {
    return this.http.post(`${this.baseUrl}transfer`, obj, this.httpOptions);
  }

  initiateBulkTransfer(obj) {
    return this.http.post(`${this.baseUrl}transfer/bulk`, obj, this.httpOptions);
  }

  fetchTransferList() {
    return this.http.get(`${this.baseUrl}transfer`, this.httpOptions);
  }
}
