import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  uname: any = ""
  acno: any
  userData: any = ""
  bal: any
  alertMessage: any = ""
  alertColor: boolean = true
  acno1: any

  constructor(private ds: DataService, private router: Router, private fb: FormBuilder, private datePipe: DatePipe) { }
  ngOnInit(): void {
    if (!localStorage.getItem('currentAcno')) {
      alert('please login')
      this.router.navigateByUrl("")
    }
    if (localStorage.getItem('currentUser')) {
      this.uname = localStorage.getItem('currentUser')
      // this.acno = localStorage.getItem('currentAcno')
    }

  }
  // reactive model  for money transfer
  transaction = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    amnt: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]
  })
  accessUser() {
    if (localStorage.getItem('currentAcno')) {
      this.acno = localStorage.getItem('currentAcno')
    }
    this.ds.getUser(this.acno).subscribe((result: any) => {   //response stored to result
      this.userData = result.message                          //object stored to userData

    })
  }
  getBal() {
    if (localStorage.getItem('currentAcno')) {
      this.acno = localStorage.getItem('currentAcno')

    }
    this.ds.getBalance(this.acno).subscribe((result: any) => {   //response stored to result
      this.bal = result.message                          //object stored to userData

    })

  }
  logout() {
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    this.router.navigateByUrl("")
  }
  moneyTransfer() {
    if (this.transaction.valid) {
      this.alertMessage = ""
      var date = new Date()
      let latest_date = this.datePipe.transform(date, 'short');
      if (localStorage.getItem("currentAcno")) {
        this.acno = localStorage.getItem("currentAcno")
      }
      if (this.acno == this.transaction.value.acno) {
        this.alertMessage = "Unable to send to same Ac!"
        this.alertColor = false
      }
      else {
        this.ds.moneyTransfer(this.acno,
          this.transaction.value.acno,
          this.transaction.value.amnt,
          this.transaction.value.psw,
          latest_date).subscribe((result: any) => {
            this.alertMessage = result.message
            this.alertColor = true
          }, result => {
            this.alertMessage = result.error.message;
            this.alertColor = false

          })
      }

    }
    else {
      this.alertMessage = "invalid form"
      this.alertColor = false

    }
  }
  deleteAc() {
    if (localStorage.getItem('currentAcno')) {
      this.acno1 = localStorage.getItem('currentAcno')

    }
  }
  cancelChild(){
    this.acno1=''
  }
  deleteAccount(event:any){
    this.ds.deleteAc(event).subscribe((result:any)=>{
      this.logout()
      alert(result.message)
    })
    
  }
}
