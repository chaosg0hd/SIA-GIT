import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { stringify } from '@angular/compiler/src/util';

export interface monthList {
  month_no: any;
  month_name: any;
}




@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private datepipe: DatePipe) { }

  apiURL = "http://localhost/SIA-GIT/API/";

  

  // NEILWINN PINEDAS MOTHERFUCKING PAYROLL ENGINE

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
  // Needs to be Redone

  date: any;

  //Get Current Date

  getDate() {
    var currentDate;
    currentDate = new Date();
    currentDate = this.datepipe.transform(currentDate, 'yyyy-MM-dd');
    console.log(currentDate + ' From Data Service: Method getDate');

    return <any>(currentDate)
  }

  //Get Current Date

  getMonth() {
    var currentMonth;
    currentMonth = new Date();
    currentMonth = this.datepipe.transform(currentMonth, 'yyyy-MM-dd');
    console.log(currentMonth + ' From Data Service: Method getMonth');

    return <any>(currentMonth)
  }

  //Get First Date of Month

  getfirstDay(month: number) {
    var firstDay;
    this.date = new Date();
    firstDay = this.date.setMonth(month);
    firstDay = this.date.setDate(1);
    firstDay = this.datepipe.transform(firstDay, 'yyyy-MM-dd');
    console.log(firstDay + ' From Data Service: Method getfirstDay');

    return <any>(firstDay)
  }

  //Get Last Date of Month

  getlastDay(month: number) {
    var lastDay;
    this.date = new Date();
    lastDay = this.date.setMonth(month + 1);
    lastDay = this.date.setDate(1);
    lastDay = this.date.setDate(this.date.getDate() - 1);
    lastDay = this.datepipe.transform(lastDay, 'yyyy-MM-dd');
    console.log(lastDay + ' From Data Service: Method getlastDay');

    return <any>(lastDay)
  }

  //Generate Days in a month

  gendaysArray(month : any) {
    var day;
    var lastDay;
    var daysArray: any[] = [];

    this.date = new Date();
    day = this.date.setMonth(5);
    lastDay = this.getlastDay(month+4);
    lastDay = this.date.getDate();
    console.log(lastDay + ' last day From Data Service: Method gendaysArray');

    for (let i = 0, j = lastDay; i < j; i++) {
      day = this.date.setDate(i + 1);
      day = this.datepipe.transform(day, 'yyyy-MM-dd');
      daysArray.push(day);
      console.log(day + ' From Data Service: Method gendaysArray');
    }
    console.log(daysArray + ' From Data Service: Method gendaysArray');

    return <any>(daysArray)
  }

  monthsArray: string[] = [];

  genMonsArray() {

    var monsArray: any[] = [];
    var mon
    for (let i = 0, j = 12; i < j; i++) {
      console.log(i);
      mon = this.date.setDate(1);
      mon = this.date.setMonth(i);      
      console.log(mon);
      mon = this.datepipe.transform(mon, 'MMMM');
      console.log(i, mon + ' From Data Service: Method genMonsArray');
      monsArray.push(mon)
      console.log(monsArray + ' From Data Service: Method genMonsArray');
    }
    return <any>(monsArray)
  }

  //generate days in a month but previous
  
  genprevdaysarray() {
    var day;
    var lastDay;
    var daysArray: any[] = [];

    this.date = new Date();
    day = this.date.setMonth(this.date.getMonth(this.getDate() - 1));

    lastDay = this.date.getDate(this.getlastDay(this.date.getMonth(day) - 1));

    console.log(lastDay + ' last day From Data Service: Method gendaysArray');

    for (let i = 0, j = lastDay; i < j; i++) {
      day = this.date.setDate(i + 1);
      day = this.datepipe.transform(day, 'yyyy-MM-dd');
      daysArray.push(day);
      console.log(day + ' From Data Service: Method gendaysArray');
    }
    console.log(daysArray + ' From Data Service: Method gendaysArray');

    return <any>(daysArray)
  }

  ////Generate Days in a month but next

  //gennextdaysArray() {
  //  var day;
  //  var lastDay;
  //  var daysArray: any[];

  //  daysArray = [];
  //  this.date = new Date();
  //  lastDay = this.getlastDay();
  //  lastDay = this.date.getDate(lastDay);
  //  day = this.getfirstDay();

  //  for (let i = 0, j = lastDay; i < j; i++) {
  //    day = this.date.setDate(i + 1);
  //    day = this.datepipe.transform(day, 'yyyy-MM-dd');
  //    daysArray.push(day);
  //    console.log(day + ' From Data Service: Method gendaysArray');
  //  }
  //  console.log(daysArray + ' From Data Service: Method gendaysArray');

  //  return <any>(daysArray)
  //}

  

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
