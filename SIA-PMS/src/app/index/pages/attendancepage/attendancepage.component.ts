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


  empColumns: string[] = [
    "emp_name", 
  ];

  constructor(public datepipe: DatePipe, private noti: MatSnackBar, private data: DataService) { }

  ngOnInit(): void {

    this.getDate();
    this.getfirstDay();
    this.getlastDay();
    this.getDayArray();
    //this.getDayArraywithAp();
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
    this.firstDay = this.data.getfirstDay();
    this.firstDay = this.datepipe.transform(this.firstDay, 'yyyy-MM-dd');
  }

  //Get Last Date
  lastDay: any;
  getlastDay() {
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
  //dayArraywithAp: string[] = [];

  getDayArray() {
    this.dayArray = this.data.gendaysArray();
    this.empColumns = this.empColumns.concat(this.dayArray);
    this.empColumns = this.empColumns.concat("total");
    console.log(this.empColumns + 'From Attendance Page: Method getDayArray')
  }

  //getDayArraywithAp() {
  //  this.dayArray = this.data.gendaysArray();
  //  this.empColumns = this.empColumns.concat(this.dayArray);
  //  console.log(this.empColumns + 'From Attendance Page: Method getDayArraywithAp')
  //}

  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      this.empInfoTable = data.payload;
      console.log(this.empInfoTable);
      this.empInfoTableDataSource.data = this.empInfoTable;
      console.log(this.empInfoTableDataSource + ' From Dashboard Page: Method pullAllEmp');
    });
  }

  totalHours = 0;

  addtoTotal(hour: any) {
    //this.totalHours = parseInt(this.totalHours);
    //hour = parseInt(hour);
    this.totalHours = this.totalHours + hour;
    console.log(this.totalHours + ' From Dashboard Page: Method addtoTotal');
  }

  getTotalHours() {
    var total;
    total = this.totalHours;
    this.totalHours = 0;
    return total;
  }

  //pullAllWage() {
  //  this.data.sendApiRequest("pullAllWage", null).subscribe((data: any) => {
  //    this.wageInfoTable = data.payload;
  //    console.log(this.wageInfoTable);
  //    this.wageInfoTableDataSource.data = this.wageInfoTable;
  //    console.log(this.wageInfoTableDataSource);
  //  })
  //}

  pullAllAtt() {
    this.data.sendApiRequest("pullAllAtt", null).subscribe((data: any) => {
      this.attInfoTable = data.payload;
      this.attInfoTableDataSource = new MatTableDataSource(this.attInfoTable);
      /*this.ngAfterViewInit();*/
      console.log(this.attInfoTable + ' From Dashboard Page: Method pullAllAtt');
    });
    /*this.ngAfterViewInit();*/
  }

  //pullAllWage() {
  //  this.data.sendApiRequest("pullAllWage", null).subscribe((data: any) => {
  //    this.wageInfoTable = data.payload;
  //    console.log(this.wageInfoTable);
  //    this.wageInfoTableDataSource.data = this.wageInfoTable;
  //    console.log(this.wageInfoTableDataSource);
  //  })
  //}

  notify() {
    this.noti.open("hello", "ok");
    console.log("Index Running")
  }






}
