import { Component, OnInit } from '@angular/core';

import { faCode } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  faCode = faCode;

  constructor() { }

  ngOnInit(): void {
  }

 
}

