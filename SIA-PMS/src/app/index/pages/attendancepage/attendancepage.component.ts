import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { DatePipe, Time } from '@angular/common';
import { LowerCasePipe } from '@angular/common';


import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { RouterModule } from '@angular/router';

//INTERFACES

export interface empTable {
  emp_id: string;
  emp_firstname: string;
  emp_lastname: string;
  emp_address: string;
  emp_datebirth: Date;
  emp_contact: string;
  emp_time_in: Time;
  emp_time_out: Time;
  emp_department: string;
  emp_is_archived: string;
  emp_sex: string;
  emp_position: string;
  emp_start_date: Date;
  emp_status: string;
  emp_last_mod_date: Date;
  emp_last_mod_by: any;
}

export interface dtrTable {
  emp_id: string;
  emp_firstname: string;
  emp_lastname: string;
  emp_address: string;
}

export interface attendanceTable {
  emp_id: any;
  attendanceJSON: JSON;
}

export interface dtrJSON {
  date: Date;
  am_time_in: any;
  am_time_out: any;
  pm_time_in: any;
  pm_time_out: any;
  ot_time_in: any;
  ot_time_out: any;
  mhrs: number;
  remarks: string;
}

@Component({
  selector: 'app-attendancepage',
  templateUrl: './attendancepage.component.html',
  styleUrls: ['./attendancepage.component.css']
})
export class AttendancepageComponent implements OnInit, AfterViewInit {

  isDoneLoading = "false";

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;  

  

  constructor(private datepipe: DatePipe, private noti: MatSnackBar, public lowercasepipe: LowerCasePipe, private data: DataService, private router: RouterModule) { }

  ngOnInit(): void {
    this.getDate();
    this.getMonsArray();
    this.pullAllEmp();
    this.buildTable();
  }

  ngAfterViewInit(): void {
    //this.empInfoTableDataSource.paginator = this.paginator;
    //this.empInfoTableDataSource.sort = this.sort;
  }

  //Set Date Functions

  currentDate: any;
  month: any;
  monthinNum: any;
  year: any;
  monthintText: any;
  month_year: any;
  dateIndex: any;

  //Sets Date Variables

  getDate() {

    //Sets Date
    this.currentDate = new Date(this.data.getDate());
    console.log(this.currentDate + " From DTR Page: Method getDate");
    //Sets Month and MonthYear Var
    this.monthinNum = this.data.getMonthinNum();
    this.month = this.data.getMonth();
    console.log(this.month + " From DTR Page: Method getDate ++++++++++++++++++");
    this.monthintText = this.lowercasepipe.transform(this.month);
    console.log(this.monthintText + " From DTR Page: Method getDate");
    this.year = this.data.getYear();
    this.month_year = this.monthintText + '_' + this.year;
    console.log(this.month_year + " From DTR Page: Method getDate");
    //Generate Days
    this.getDaysArray(this.monthinNum);
    //Sets Tab Index
    this.dateIndex = this.monthinNum;
  }


  //Generate Days Array
  dayArray: any;
  getDaysArray(month: number) {
    this.dayArray = this.data.generateDaysArray(month);
    console.log(this.dayArray + 'From DTR Page: Method getDayArray');
  }

  //Generate Months Array
  monthsArray: any;
  getMonsArray() {
    this.monthsArray = this.data.generateMonsArray();
    console.log(this.monthsArray + 'From DTR Page: Method generateMonsArray');
  }

  hightabClick(event: any) {

    //Big Buttons Sa taas
    var string = event.tab.textLabel;
    string = string.split(':');
    var month = string[0].replace(/^\s+|\s+$/g, "");
    console.log(month + 'From DTR Page: Method hightabClick');
    this.month = month;
    console.log(this.month + " From DTR Page: Method hightabClick");
    this.monthinNum = event.index
    console.log(this.monthinNum + " From DTR Page: Method hightabClick");
    this.monthintText = this.lowercasepipe.transform(this.month);
    console.log(this.monthintText + " From DTR Page: Method hightabClick");
    this.month_year = this.monthintText + '_' + this.year;
    console.log(this.month_year + " From DTR Page: Method hightabClick +++++++++++++++++++++++++");

    this.dateIndex = this.monthinNum;
    this.getDaysArray(this.monthinNum);
    this.buildTable();
    /*this.pullAllDTR();*/
  }

  empInfoTable: empTable[] = [];
  dtrInfoTable: dtrTable[] = [];
  dtrJSONTable: dtrJSON[] = [];

  empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);

  empInfo: any = {};
  dtrInfo: any = {};
  dtrJSONInfo: any = {};  

  //pullAllDTR() {
  //  this.data.sendApiRequest("pullAllDTR", null).subscribe((data: any) => {
  //    this.dtrInfoTable = data.payload;
  //    console.log(this.dtrInfoTable + ' From DTR Page: Method pullAllDTR');
  //    console.log(this.activeEmp + ' From DTR Page: Method pullAllDTR');
  //  });
  //}




  //consolelog(string: any) {
  //  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  //  console.log(string)
  //}


  //tabClick(event: any) {
  //  console.log(event + "From Attendance Page: tabClick")
  //  this.getDaysArray(event.index);
    
  //}

  ////Time Methods
  //date: any;
  //month!: number;

  ////To be Deleted
  //monthNumbertoText(monthNumber: number) {

  //}

  ////Filter 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.empInfoTableDataSource.filter = filterValue;
  }

  ////Get Current Date
  //currentDate: any;
  //getDate() {
  //  //Sets Date
  //  this.currentDate = this.data.getDate();
  //  this.month = Number( this.datepipe.transform(this.currentDate, 'MM'));
  //  //Sets Month
  //  this.month = this.month - 1;
  //  console.log(this.month + "From Attendance Page: Method getDate")
  //}

  
  ////These 2 are useless really, 
  ////Get First Date
  //firstDay: any;
  //getFirstDayofThisMonth() {
  //  var month
  //  this.date = new Date();
  //  month = this.date.getMonth();
  //  this.firstDay = this.data.getFirstDayofMonth(month);
  //}
  ////Get Last Date
  //lastDay: any;
  //getLastDayofThisMonth() {
  //  var month
  //  this.date = new Date();
  //  month = this.date.getMonth();
  //  this.lastDay = this.data.getLastDayofMonth(month);
  //}
  ////Generate Days Array
  //dayArray: string[] = [];

  //getDaysArray(month: number) {
  //  this.dayArray = this.data.generateDaysArray(month);
  //  console.log(this.dayArray + 'From Attendance Page: Method getDayArray');



  //TABLE BUILDER

  attendanceColumns: string[] = [];

  buildTable() {
    this.attendanceColumns = [];
    this.attendanceColumns.push("emp_name");
    this.attendanceColumns = this.attendanceColumns.concat(this.dayArray);
    this.attendanceColumns.push("total");
  }

  //  //Implement Dedicated Functions
  //  this.attendanceColumns = [];

  //  //add First Columns
  //  this.attendanceColumns.push("emp_name");
  //  //add Days columns    
  //  this.attendanceColumns = this.attendanceColumns.concat(this.dayArray);
  //  //add End Columns
  //  this.attendanceColumns.push("total");
  //  //Reload Emp
  //  this.pullAllEmp();
  //  console.log(this.attendanceColumns + 'From Attendance Page: Method getDayArray');
  //}

  ////Generate Mons Array
  //monthsArray: string[] = [];

  //getMonsArray() {
  //  this.monthsArray = this.data.generateMonsArray();
  //  console.log(this.monthsArray + 'From Attendance Page: Method generateMonsArray');    
  //}

  //Pull Emp Data
  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      this.empInfoTable = data.payload;
      console.log(this.empInfoTable);
      this.empInfoTableDataSource.data = this.empInfoTable;
      console.log(this.empInfoTableDataSource + ' From Dashboard Page: Method pullAllEmp');
    });     
  }

  ////Summate Hour, Needs Better Implementation

  //totalHours = 0;

  ////Reads per line needs to improve further

  //addtoTotal(hour: any, id: any) {
  //  //this.totalHours = this.totalHours + hour;
  //  //console.log(this.totalHours + ' From Dashboard Page: Method addtoTotal');
  //}

  //getTotalHours(id: any) {
  //  //var total;
  //  //total = this.totalHours;
  //  //this.totalHours = 0;
  //  //return total;
  //}

  //pullAllAtt() {
  //  this.data.sendApiRequest("pullAllAtt", null).subscribe((data: any) => {
  //    this.attInfoTable = data.payload;
  //    this.attInfoTableDataSource = new MatTableDataSource(this.attInfoTable);
  //    console.log(this.attInfoTable + ' From Dashboard Page: Method pullAllAtt');
  //  });
  //}



  //notify() {
  //  this.noti.open("hello", "ok");
  //  console.log("Index Running")
  //}






}
