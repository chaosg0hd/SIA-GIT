import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.css']
})
export class DashboardpageComponent implements OnInit {

  constructor(public datepipe: DatePipe, private noti: MatSnackBar, private data: DataService) { }

  ngOnInit(): void {
    
    this.getDate();
    this.getfirstDay();
    this.getlastDay();    
    this.getDayArray();
    this.notify();
  }

  //Time Methods
  date: any;

  //Get Current Date
  currentDate: any;
  getDate() {
    this.currentDate = this.data.getDate();
    this.currentDate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
  }

  //Get First Date
  firstDay: any;  
  getfirstDay() {
    this.firstDay = this.data.getfirstDay();
    this.firstDay = this.datepipe.transform(this.firstDay, 'yyyy-MM-dd');
  }

  //Get Last Date
  lastDay: any;  
  getlastDay(){
    this.lastDay = this.data.getlastDay();
    this.lastDay = this.datepipe.transform(this.lastDay, 'yyyy-MM-dd');
  }

  //testDateLogic() {
  //  //this.date = new Date();
  //  //this.date = this.firstDay;
  //  /*this.days = this.firstDay.getDate();*/

  //  console.log('Date Content :' + this.date)
  //  console.log('Day :' + this.days)
  //  console.log('First Day :' + this.firstDay.getDate)
  //  console.log('Last Day :' + this.lastDay)
  //  console.log(this.currentDate)
  //}

  dayArray: string[] = [];
  getDayArray() {
    this.dayArray = this.data.gendaysArray();
  }


  notify() {
    this.noti.open("hello", "ok");
    console.log("Index Running")
  }



  
  

}
