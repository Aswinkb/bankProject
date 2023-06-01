import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data = "Happy banking with us"
  pdata = "Acc no"
  serviceData:any
  constructor(private rout:Router, private ds: DataService){

  }
  ngOnInit(){
    this.serviceData =this.ds.sdata
    console.log(this.serviceData);
    this.ds.smethod()

    
    
  }
  login(a:any) {
    
    // alert('login clicked')
    this.rout.navigateByUrl('home')
  }
  
  
}
