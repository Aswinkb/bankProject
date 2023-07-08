import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  acno:any
  transactions:any
  date:any
  searchString=""
  constructor(private dsw:DataService, private router: Router){

  }
  ngOnInit(): void{
    if(localStorage.getItem('currentAcno')){
      this.acno= localStorage.getItem('currentAcno')
      // console.log(this.acno);
      this.dsw.getTransaction(this.acno).subscribe((result:any)=>{
        this.transactions=result.message
        console.log(this.transactions);
        
      })
      
    }
    this.date=new Date

  }
  
  back(){
    this.router.navigateByUrl('home')

  }
  filterPipe(data:any){
    this.searchString=data
  }
  exportPdf(){
    
  }
}
