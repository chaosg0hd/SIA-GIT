import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timein',
  templateUrl: './timein.component.html',
  styleUrls: ['./timein.component.css']
})
export class TimeinComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  myDate: Date = new Date();

}
