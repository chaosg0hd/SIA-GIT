import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

//export interface monthList {
//  month_no: any;
//  month_name: any;
//}

export interface empTable {
  emp_id: any;
  emp_firstname: any;
}

export interface attTable {
  attendance_id: any;
  emp_id: any;
  attendance_date: any;
  attendance_hours: any;
  attendance_remarks: any;
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

  empInfoTable: empTable[] = [];
  empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);

  attInfoTable: attTable[] = [];
  attInfoTableDataSource = new MatTableDataSource(this.attInfoTable);

 /* monthsArray: monthList[] = [];*/



 attendanceColumns: string[] = [];
  

  constructor(public datepipe: DatePipe, private noti: MatSnackBar, private data: DataService) { }

  ngOnInit(): void {
    this.getDate();
    //this.getMonth()
    this.getFirstDayofThisMonth();
    this.getLastDayofThisMonth();
    this.getDaysArray(this.month);    
    this.pullAllAtt();
    this.notify();
    this.getMonsArray();
    this.pullAllEmp();
  }

  ngAfterViewInit() {
    this.empInfoTableDataSource.paginator = this.paginator;
    this.empInfoTableDataSource.sort = this.sort;
  }

  consolelog(string: any) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(string)
  }

  tabClick(event: any) {
    console.log(event + "From Attendance Page: tabClick")
    this.getDaysArray(event.index);
    
  }

  //Time Methods
  date: any;
  month!: number;

  //To be Deleted
  monthNumbertoText(monthNumber: number) {

  }

  //Get Current Date
  currentDate: any;
  getDate() {
    //Sets Date
    this.currentDate = this.data.getDate();
    this.month = Number( this.datepipe.transform(this.currentDate, 'MM'));
    //Sets Month
    this.month = this.month - 1;
    console.log(this.month + "From Attendance Page: Method getDate")
  }

  
  //These 2 are useless really, 
  //Get First Date
  firstDay: any;
  getFirstDayofThisMonth() {
    var month
    this.date = new Date();
    month = this.date.getMonth();
    this.firstDay = this.data.getFirstDayofMonth(month);
  }
  //Get Last Date
  lastDay: any;
  getLastDayofThisMonth() {
    var month
    this.date = new Date();
    month = this.date.getMonth();
    this.lastDay = this.data.getLastDayofMonth(month);
  }

  //Generate Days Array
  dayArray: string[] = [];

  getDaysArray(month: number) {
    this.dayArray = this.data.generateDaysArray(month);
    console.log(this.dayArray + 'From Attendance Page: Method getDayArray');


    //Implement Dedicated Functions
    this.attendanceColumns = [];

    //add First Columns
    this.attendanceColumns.push("emp_name");
    //add Days columns    
    this.attendanceColumns = this.attendanceColumns.concat(this.dayArray);
    //add End Columns
    this.attendanceColumns.push("total");
    //Reload Emp
    this.pullAllEmp();
    console.log(this.attendanceColumns + 'From Attendance Page: Method getDayArray');
  }

  //mergeDaysColumns() {
  //}

  //Generate Mons Array
  monthsArray: string[] = [];

  getMonsArray() {
    this.monthsArray = this.data.generateMonsArray();
    console.log(this.monthsArray + 'From Attendance Page: Method generateMonsArray');    
  }

  //Pull Emp Data

  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      this.empInfoTable = data.payload;
      console.log(this.empInfoTable);
      this.empInfoTableDataSource.data = this.empInfoTable;
      console.log(this.empInfoTableDataSource + ' From Dashboard Page: Method pullAllEmp');
    });
      

    this.isDoneLoading = "true"
    /*console.log(this.isDoneLoading + ' ###################################');*/
  }

  //Summate Hour, Needs Better Implementation

  totalHours = 0;

  //Reads per line needs to improve further

  addtoTotal(hour: any) {
    this.totalHours = this.totalHours + hour;
    console.log(this.totalHours + ' From Dashboard Page: Method addtoTotal');
  }

  getTotalHours() {
    var total;
    total = this.totalHours;
    this.totalHours = 0;
    return total;
  }

  pullAllAtt() {
    this.data.sendApiRequest("pullAllAtt", null).subscribe((data: any) => {
      this.attInfoTable = data.payload;
      this.attInfoTableDataSource = new MatTableDataSource(this.attInfoTable);
      console.log(this.attInfoTable + ' From Dashboard Page: Method pullAllAtt');
    });
  }

  notify() {
    this.noti.open("hello", "ok");
    console.log("Index Running")
  }






}
