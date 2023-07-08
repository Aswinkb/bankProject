import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// header overloading
const options = {
  headers: new HttpHeaders
  }
  
@Injectable({
  providedIn: 'root'
})


export class DataService {
  constructor(private http: HttpClient) { }

  // header creation
  getHeader() {
    // header 
    let headers = new HttpHeaders
    // add token to header  - append
    let token = JSON.parse(localStorage.getItem('token') || '')
    // store the header in option object as header keys to value (to achieve overloading)
    options.headers = headers.append('access_token', token)
    // return
    return options

  }

  // api to register
  register(acno: any, uname: any, psw: any) {
    const bodyData = {
      acno,
      uname,
      psw
    }
    return this.http.post('http://localhost:3000/register', bodyData)

  }

  // api to login
  login(acno: any, psw: any) {
    const body = {
      acno, psw
    }
    return this.http.post('http://localhost:3000/login', body)
  }

  // api to get single user data
  getUser(acno: any) {
    return this.http.get('http://localhost:3000/getuser/' + acno, this.getHeader() )
  }

  // .api to get balance
  getBalance(acno: any) {
    return this.http.get('http://localhost:3000/getbalance/' + acno, this.getHeader())
  }

  // api to money transfer
  moneyTransfer(fromAcno: any, toAcno: any, amount: any, psw: any, date: any) {
    const body = {
      fromAcno,
      toAcno,
      amount,
      psw,
      date
    }
    return this.http.post('http://localhost:3000/transfer', body, this.getHeader())
  }
  // api to get transaction history
  getTransaction(acno: any) {
    return this.http.get('http://localhost:3000/history/' + acno, this.getHeader())
  }
  // api to delete ac
  deleteAc(acno:any){
    return this.http.delete('http://localhost:3000/deleteac/' + acno,this.getHeader())
  }
}
