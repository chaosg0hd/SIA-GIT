import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faCode } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  faCode = faCode;

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.router.navigate(['login']);
  }

 
}

