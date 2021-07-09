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
  //Try to Implement Multiple Database Support
  //Kaso di ako marunong mag PHP

  //API Request Methods

  sendApiRequest(method: any, data: any) {

    return <any>(
      this.http.post(this.apiURL + method, btoa(JSON.stringify(data)))
    );
  }

  //Database Methods *********************************************************************************
  //Tried to Implement Database loading from here but just adds more boilerplate, so not really needed
  //End of Database Methods **************************************************************************

  // Time Methods
  // Fucking Fix Pls Poorly Implemented
  // Needs to be Redone

  date: any;

  //Get Current Date
  //This is Already Perfect Do Not Change

  getDate() {
    this.date = new Date();
    this.date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    console.log(this.date + ' From Data Service: Method getDate');
    return <any>(this.date)
  }

  getFirstDayofMonth(month : number) {
    this.date = new Date();
    this.date.setDate(1);
    this.date.setMonth(month);    
    this.date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    console.log(this.date + ' From Data Service: Method getFirstDayofMonth');
    return <any>(this.date)
  }

  getLastDayofMonth(month: number) {
    this.date = new Date();
    this.date.setMonth(month + 1);
    this.date.setDate(0);
    this.date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    console.log(this.date + ' From Data Service: Method getLastDayofMonth');
    return <any>(this.date)
  }

  ////Get Current Month
  ////Will Delete This is fucking the same from above

  //getMonth() {
  //  var currentMonth;
  //  this.date = new Date();
  //  currentMonth = new Date();
  //  currentMonth = this.datepipe.transform(currentMonth, 'yyyy-MM-dd');
  //  console.log(currentMonth + ' From Data Service: Method getMonth');
  //  return <any>(currentMonth)
  //}

  ////Get First Date of Month
  ////Will Delete This is fucking unnecessaru 

  //getfirstDay(month: number) {
  //  var firstDay;
  //  this.date = new Date();
  //  firstDay = this.date.setMonth(month);
  //  firstDay = this.date.setDate(1);
  //  firstDay = this.datepipe.transform(firstDay, 'yyyy-MM-dd');
  //  console.log(firstDay + ' From Data Service: Method getfirstDay');
  //  return <any>(firstDay)
  //}

  ////Get Last Date of Month
  ////Will Delete This is fucking unnecessaru 

  //getlastDay(month: number) {
  //  var lastDay;
  //  this.date = new Date();
  //  lastDay = this.date.setMonth(month + 1);
  //  lastDay = this.date.setDate(1);
  //  lastDay = this.date.setDate(this.date.getDate() - 1);
  //  lastDay = this.datepipe.transform(lastDay, 'yyyy-MM-dd');
  //  console.log(lastDay + ' From Data Service: Method getlastDay');
  //  return <any>(lastDay)
  //}

  ////Generate Days in a month

  //generateDaysArray(month : any) {
  //  var day;
  //  var lastDay;
  //  var daysArray: any[] = [];

  //  this.date = new Date();
  //  day = this.date.setMonth(5);
  //  /*lastDay = this.getlastDay(month+4);*/
  //  lastDay = this.date.getDate();
  //  console.log(lastDay + ' last day From Data Service: Method gendaysArray');

  //  //for (let i = 0, j = lastDay; i < j; i++) {
  //  //  day = this.date.setDate(i + 1);
  //  //  day = this.datepipe.transform(day, 'yyyy-MM-dd');
  //  //  daysArray.push(day);
  //  //  console.log(day + ' From Data Service: Method gendaysArray');
  //  //}
  //  //console.log(daysArray + ' From Data Service: Method gendaysArray');

  //  return <any>(daysArray)
  //}

  //generate Months

  monthsArray: string[] = [];

  generateMonsArray() {  
    var monsArray: any[] = [];
    var mon
    for (let i = 0, j = 12; i < j; i++) {
      this.date = new Date();
      this.date.setDate(1);
      this.date.setMonth(i);      
      mon = this.datepipe.transform(this.date, 'yyyy-MM-dd');
      monsArray.push(mon);
      console.log(mon + ' From Data Service: Method genMonsArray');
    }
    console.log(monsArray + ' From Data Service: Method genMonsArray');
    return <any>(monsArray)
  }  

  generateDaysArray(month : number) {
    var daysArray: any[] = [];
    var day;
    var daysinMonth;
    var lastDay;    
    lastDay = this.getLastDayofMonth(month);
    this.date = new Date(lastDay);
    daysinMonth = this.date.getDate(lastDay);
    this.date = new Date();
    this.date.setDate(1);
    this.date.setMonth(month);
    for (let i = 1, j = daysinMonth; i <= j; i++) {
      this.date.setDate(i);
      day = this.datepipe.transform(this.date, 'yyyy-MM-dd');
      daysArray.push(day)
      console.log(day + ' From Data Service: Method generateDaysArray');
    }
    console.log(daysArray + ' From Data Service: Method generateDaysArray'); 
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
