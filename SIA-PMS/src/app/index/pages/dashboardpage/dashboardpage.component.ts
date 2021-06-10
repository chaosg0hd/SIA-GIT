import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.css']
})
export class DashboardpageComponent implements OnInit {

  date: any;
/*month: any;*/
  days: any;
  lastDay: any;
  firstDay: any;
  current_date: any;
  dayArray : string[] = [];


  constructor(public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getDate();
    this.getLastDay();
    this.getFirstDay();    
    this.getDayArray();
    this.testDateLogic();
  }

  getDate() {
    this.current_date = new Date();
    this.current_date = this.datepipe.transform(this.current_date, 'yyyy-MM-dd');
    console.log(this.current_date);
  }

  getFirstDay() {
    this.date = new Date();
    this.firstDay = this.date.setMonth(this.date.getMonth() - 1);
    this.firstDay = this.date.setDate(1);
    /*this.firstDay = this.date.setDate(this.date.getDate() - 1);*/
    console.log(this.firstDay);
    console.log(this.firstDay);
    /*let firstDay = this.datepipe.transform(this.firstDay, 'yyyy-MM-dd');*/
  }

  getLastDay(){
    this.date = new Date();
    this.lastDay = this.date.setMonth(this.date.getMonth() + 1);
    this.lastDay = this.date.setDate(1);
    this.lastDay = this.date.setDate(this.date.getDate() - 1);
    this.days = this.date.getDate();
    console.log(this.lastDay);

    /*let lastDay = this.datepipe.transform(this.lastDay, 'yyyy-MM-dd');*/
  }

  testDateLogic() {
    //this.date = new Date();
    //this.date = this.firstDay;
    /*this.days = this.firstDay.getDate();*/

    console.log('Date Content :' + this.date)
    console.log('Day :' + this.days)
    console.log('First Day :' + this.firstDay.getDate)
    console.log('Last Day :' + this.lastDay)
    console.log(this.current_date)
  }

  getDayArray() {
    this.date = new Date();
    this.firstDay = this.date.setDate(1)
    for (let i = 1, j = this.days + 1; i < j; i++) {
      this.firstDay = this.datepipe.transform(this.firstDay, 'yyyy-MM-dd');
      this.dayArray.push(this.firstDay);
      this.firstDay = this.date.setDate(this.date.getDate() + 1);      
      console.log(this.firstDay);
      console.log(this.dayArray);
    }

  }

  //var d = new Date();
  //d.getFullYear();	//Get the year as a four digit number (yyyy)
  //d.getMonth();	//Get the month as a number (0-11)
  //d.getDate();	//Get the day as a number (1-31)
  //d.getHours();	//Get the hour (0-23)
  //d.getMinutes();	//Get the minute (0-59)
  //d.getSeconds();	 //Get the second (0-59)
  //d.getMilliseconds()	//Get the millisecond (0-999)
  //d.getTime();	//Get the time (milliseconds since January 1, 1970)
  //d.getDay();  //Get the weekday as a number (0-6)
  //d.Date.now();	//Get the time. ECMAScript 5.
  //d.setDate()	//Set the day as a number (1-31)
  //d.setFullYear()	//Set the year (optionally month and day)
  //d.setHours()	//Set the hour (0-23)
  //d.setMilliseconds()	//Set the milliseconds (0-999)
  //d.setMinutes()	//Set the minutes (0-59)
  //d.setMonth()	//Set the month (0-11)
  //d.setSeconds()	//Set the seconds (0-59)
  //d.setTime()	//Set the time (milliseconds since January 1, 1970)
  

}
