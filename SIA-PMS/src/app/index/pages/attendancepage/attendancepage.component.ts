import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface empTable {
  emp_id: any;
  emp_name: any;
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


  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  empInfoTable: empTable[] = [];
  empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);

  attInfoTable: attTable[] = [];
  attInfoTableDataSource = new MatTableDataSource(this.attInfoTable);


  thisMonthColumns: string[] = [
    "emp_name", 
  ];

  previousMonthColumns: string[] = [
    "emp_name",
  ];

  nextMonthColumns: string[] = [
    "emp_name",
  ];

  constructor(public datepipe: DatePipe, private noti: MatSnackBar, private data: DataService) { }

  ngOnInit(): void {

    this.getDate();
    this.getfirstDay();
    this.getlastDay();
    this.getDayArray();
    this.pullAllEmp();
    this.pullAllAtt();
    this.notify();
  }

  ngAfterViewInit() {
    this.empInfoTableDataSource.paginator = this.paginator;
    this.empInfoTableDataSource.sort = this.sort;
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
    this.date = new Date();
    var month;
    month = this.date.getMonth(this.currentDate);
    this.firstDay = this.data.getfirstDay(month);
    this.firstDay = this.datepipe.transform(this.firstDay, 'yyyy-MM-dd');
  }

  //Get Last Date
  lastDay: any;
  getlastDay() {
    this.date = new Date();
    var month;
    month = this.date.getMonth(this.currentDate);
    this.lastDay = this.data.getlastDay(month);
    this.lastDay = this.datepipe.transform(this.lastDay, 'yyyy-MM-dd');
  }

  //Generate Days Array
  dayArray: string[] = [];

  getDayArray() {
    this.dayArray = this.data.genprevdaysarray();
    this.thisMonthColumns = this.thisMonthColumns.concat(this.dayArray);
    this.thisMonthColumns = this.thisMonthColumns.concat("total");
    console.log(this.thisMonthColumns + 'From Attendance Page: Method getDayArray')
  }

  //Pull Emp Data

  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      this.empInfoTable = data.payload;
      console.log(this.empInfoTable);
      this.empInfoTableDataSource.data = this.empInfoTable;
      console.log(this.empInfoTableDataSource + ' From Dashboard Page: Method pullAllEmp');
    });
  }

  //Summate Hour, Needs Better Implementation

  totalHours = 0;

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
