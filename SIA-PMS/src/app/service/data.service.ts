import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private datepipe: DatePipe) { }

  apiURL = "http://localhost/SIA-GIT/API/";


  // NEILWINN PINEDAS MOTHERFUCKING PAYROLL ENGINE
  // TODO: Should make all this inside a do while loop logic

  //Service Methods 

  //API Request Methods
  sendApiRequest(method: any, data: any) {

    return <any>(
      this.http.post(this.apiURL + method, btoa(JSON.stringify(data)))
    );
  }

  //Database Methods

  pullAllEmp() {
    var emp : any[];
    this.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      emp = data.payload;
      console.log(emp + ' From Data Service: Method pullAllEmp');
      return <any>(emp);
    }); 
  }


  //End of Database Methods

  // Time Methods
  // Fucking Fix Pls Poorly Implemented

  date: any;

  //Get Current Date

  getDate() {
    var currentDate;
    currentDate = new Date();
    currentDate = this.datepipe.transform(currentDate, 'yyyy-MM-dd');
    console.log(currentDate + ' From Data Service: Method getDate');

    return <any>(currentDate)
  }

  //Get First Date of Month

  getfirstDay() {
    var firstDay;
    this.date = new Date();
    firstDay = this.date.setDate(1);
    //Extension to 15 days
    /*firstDay = this.date.setDate(this.date.getDate());*/
    firstDay = this.datepipe.transform(firstDay, 'yyyy-MM-dd');
    console.log(firstDay + ' From Data Service: Method getfirstDay');

    return <any>(firstDay)
  }

  //Get Last Date of Month

  getlastDay() {
    var lastDay;
    this.date = new Date();
    lastDay = this.date.setMonth(this.date.getMonth() + 1);
    lastDay = this.date.setDate(1);
    lastDay = this.date.setDate(this.date.getDate() - 1);
    //Extension to 15 days
    /*lastDay = this.date.setDate(this.date.getDate());*/
    lastDay = this.datepipe.transform(lastDay, 'yyyy-MM-dd');
    console.log(lastDay + ' From Data Service: Method getlastDay');

    return <any>(lastDay)
  }

  //Generate Days in a month
  //Now 2 Months
  
  gendaysArray() {
    var day;
    var lastDay;
    var daysArray: any[];   

    daysArray = [];
    this.date = new Date();    
    lastDay = this.getlastDay();
    lastDay = this.date.getDate(lastDay);
    day = this.getfirstDay();
    
    for (let i = 0, j = lastDay; i < j; i++) {
      day = this.date.setDate(i + 1);
      day = this.datepipe.transform(day, 'yyyy-MM-dd');
      daysArray.push(day);    
      console.log(day + ' From Data Service: Method gendaysArray');
    }
    console.log(daysArray + ' From Data Service: Method gendaysArray');

    return <any>(daysArray)
  }

  //Cheat Sheet
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

  //End of Time Methods

  //Wage Methods

  calcdayWage(wageRate: number, hours: number, whPol: number, whOTRate: number) {
    
    var wage;
    hours = Math.trunc(hours);

    if (whPol < hours) {
      wage = (wageRate * hours) + (whOTRate * (hours - whPol));
    }
    else {
      wage = wageRate * hours;
    }
    console.log(wage + ' From Data Service: Method calcdayWage');
  }


  //End of Service Methods
}
