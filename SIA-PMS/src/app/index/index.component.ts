import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  user:any

  getUser() {
    this.user = localStorage.getItem('Name')
  }

  logout(){
    this.router.navigate(['login']);
    localStorage.clear
  }

 
}

