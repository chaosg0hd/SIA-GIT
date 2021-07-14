import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeinpage',
  templateUrl: './timeinpage.component.html',
  styleUrls: ['./timeinpage.component.css']
})
export class TimeinpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  myDate: Date = new Date();

}
