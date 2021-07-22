import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private datepipe: DatePipe) { }

  //HTTP LANG DITO

  //API Request Method
  apiURL = "http://localhost/SIA-GIT/API/";
  sendApiRequest(method: any, data: any) {

    return <any>(
      this.http.post(this.apiURL + method, btoa(JSON.stringify(data))
      )
    );
  }

  //Local Request Methods
  getJSON(url1: any) {
    var url = "./assets/JSON/SampleJson.json"
    return <any>(
      this.http.get(url)
    );
  }

  //Attempt to store to folder
  storeFile(data: any) {
    var url = "../assets/JSON"
    return <any>(
      this.http.post(url, data)
    );
  }

  //KAHIT ANO NA DITO

  // Time Methods

  date: any;

  getDate() {
    this.date = new Date();
    this.date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    console.log(this.date + ' From Data Service: Method getDate');
    return <any>(this.date);
  }

  getMonth() {
    this.date = new Date();
    this.date = this.datepipe.transform(this.date, 'MMMM');
    console.log(this.date + ' From Data Service: Method getDate');
    return <any>(this.date);
  }

  getMonthinNum() {
    this.date = new Date();
    this.date = this.datepipe.transform(this.date, 'M')
    this.date = parseInt(this.date) - 1;
    console.log(this.date + ' From Data Service: Method getDate');
    return <any>(this.date);
  }

  getYear() {
    this.date = new Date();
    this.date = this.datepipe.transform(this.date, 'y');
    console.log(this.date + ' From Data Service: Method getDate');
    return <any>(this.date);
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

  //Generate Months

  monthsArray: string[] = [];

  generateMonsArray() {  
    var monsArray: any[] = [];
    var mon
    for (let i = 0, j = 12; i < j; i++) {
      this.date = new Date();
      this.date.setDate(1);
      this.date.setMonth(i);      
      mon = this.datepipe.transform(this.date, 'MMMM');
      monsArray.push(mon);
      console.log(mon + ' From Data Service: Method genMonsArray');
    }
    console.log(monsArray + ' From Data Service: Method genMonsArray');
    return <any>(monsArray)
  }

  //Generate Days

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

  //GENERATE ID

  LeadZero(num: number, size: number): string {
    let string = num + "";
    while (string.length < size) string = "0" + string;
    return <any>(string);
  }

  genID(emp_no:any) {
    var id: string = this.LeadZero(emp_no, 3);
    id = this.getYear() + id;
    console.log(id+ ' From Data Service: Method genID'); 
    return <any>(id);
  }

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
