import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {

  constructor(public router: Router, public data: DataService, public snackBar: MatSnackBar) { }


  //INITIATOR OF EVERYTHING

  ngOnInit(): void {
    this.getUser();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000 ,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  //GET USER START SESSION

  user:any

  getUser() {
    this.user = localStorage.getItem('Name')
  }
  

  logout(){
    this.router.navigate(['login']);
    localStorage.clear
  }

 
}

