import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-wagespage',
  templateUrl: './wagespage.component.html',
  styleUrls: ['./wagespage.component.css']
})
export class WagespageComponent implements OnInit {

  constructor(public datepipe: DatePipe, private data: DataService) { }

  ngOnInit(): void {
  }

}


//import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
//import { DataService } from 'src/app/service/data.service';
//import { MatPaginator } from '@angular/material/paginator';
//import { MatSort } from '@angular/material/sort';
//import { MatTableDataSource } from '@angular/material/table';
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { DatePipe } from '@angular/common';

//@Component({
//  selector: 'app-attendancepage',
//  templateUrl: './attendancepage.component.html',
//  styleUrls: ['./attendancepage.component.css']
//})
//export class AttendancepageComponent implements OnInit, AfterViewInit {

//  //Components Shit

//  constructor(public datepipe: DatePipe, private data: DataService, public dialog: MatDialog) {
//    this.dataSource = new MatTableDataSource(this.emp);
//  }

//  ngOnInit(): void {
//    this.pullAllEmp();
//    this.getDate();
//    this.getfirstDay();
//    this.getlastDay();
//    this.getDayArray();
//  }

//  ngAfterViewInit() {
//    this.dataSource.paginator = this.paginator;
//    this.dataSource.sort = this.sort;
//  }

//  //Table Declarations
//  //Fucking fix Column Visibility

//  columns: any;
//  maxColumns: string[] = ['emp_id', 'emp_name', 'emp_position', 'emp_start_date', 'emp_status', 'emp_last_mod_date', 'emp_last_mod_by', 'actions'];
//  minColumns: string[] = ['emp_name', 'emp_position', 'emp_start_date', 'emp_status', 'actions'];

//  dataSource: MatTableDataSource<any>;
//  empInfo: any = {};
//  emp: any;

//  //Table shit

//  @ViewChild(MatPaginator) paginator!: MatPaginator;
//  @ViewChild(MatSort) sort!: MatSort;

//  applyFilter(event: Event) {
//    const filterValue = (event.target as HTMLInputElement).value;
//    this.dataSource.filter = filterValue;
//  }

//  //Pull Employees

//  pullAllEmp() {
//    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
//      this.emp = data.payload;
//      this.dataSource = new MatTableDataSource(this.emp);
//      this.ngAfterViewInit();
//      console.log(this.emp + ' From Employees Page: Method pullAllEmp');
//    });
//  }

//  //Edit Employee Dialog  

//  //editEmpDialog(
//  //  emp_id: any,
//  //  emp_name: any,
//  //  emp_position: any,
//  //  emp_start_date: any,
//  //  emp_status: any,
//  //  emp_last_mod_by: any): void {
//  //  const dialogRef = this.dialog.open(EditemployeeDialog, {
//  //    width: '30%',
//  //    height: '80%',
//  //    data: { emp_id: emp_id, emp_name: emp_name, emp_position: emp_position, emp_start_date: emp_start_date, emp_status: emp_status }
//  //  });

//  //  dialogRef.afterClosed().subscribe(result => {
//  //    this.empInfo = result;
//  //    this.editEmp();
//  //    console.log(this.empInfo + ' From Employees Page: Method editEmpDialog');
//  //  });
//  //}

//  //editEmp() {
//  //  this.data.sendApiRequest("editEmp", JSON.parse(JSON.stringify(this.empInfo))).subscribe((data: any) => {

//  //    //FIX FUCKING API PROBLEMS HERE

//  //  });
//  //  this.pullAllEmp();
//  //  console.log(this.empInfo + 'From Employees Page: Method editEmpDialog');
//  //}

//  //Add Employee Dialog  

//  //addEmpDialog(
//  //  emp_id: any,
//  //  emp_name: any,
//  //  emp_position: any,
//  //  emp_start_date: any,
//  //  emp_status: any,
//  //  emp_last_mod_by: any): void {
//  //  const dialogRef = this.dialog.open(AddemployeeDialog, {
//  //    width: '30%',
//  //    height: '80%',
//  //    data: { emp_name: emp_name, emp_position: emp_position, emp_start_date: emp_start_date, emp_status: emp_status, }
//  //  });

//  //  dialogRef.afterClosed().subscribe(result => {
//  //    this.empInfo = result;
//  //    this.addEmp();
//  //    console.log(this.empInfo + ' From Employees Page: Method addEmpDialog');
//  //  });
//  //}

//  //addEmp() {
//  //  this.data.sendApiRequest("addEmp", JSON.parse(JSON.stringify(this.empInfo))).subscribe((data: any) => {

//  //    //FIX FUCKING API PROBLEMS HERE

//  //  });
//  //  this.pullAllEmp();
//  //  console.log(this.empInfo + 'From Employees Page: Method addEmpDialog');
//  //}

//  delEmp(emp_id: any) {
//    this.empInfo.emp_id = emp_id;
//    console.log(this.empInfo.emp_id + ' From Employees Page: Method delEmp');
//    this.data.sendApiRequest("delEmp", this.empInfo).subscribe((data: any) => {


//      //FIX FUCKING API PROBLEMS HERE

//      this.emp = data.payload;
//      this.dataSource = new MatTableDataSource(this.emp);
//      this.ngAfterViewInit();
//    });
//  }

//  //Time Methods
//  date: any;

//  //Get Current Date
//  currentDate: any;
//  getDate() {
//    this.currentDate = this.data.getDate();
//    this.currentDate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
//  }

//  //Get First Date
//  firstDay: any;
//  getfirstDay() {
//    this.firstDay = this.data.getfirstDay();
//    this.firstDay = this.datepipe.transform(this.firstDay, 'yyyy-MM-dd');
//  }

//  //Get Last Date
//  lastDay: any;
//  getlastDay() {
//    this.lastDay = this.data.getlastDay();
//    this.lastDay = this.datepipe.transform(this.lastDay, 'yyyy-MM-dd');
//  }

//  //testDateLogic() {
//  //  //this.date = new Date();
//  //  //this.date = this.firstDay;
//  //  /*this.days = this.firstDay.getDate();*/

//  //  console.log('Date Content :' + this.date)
//  //  console.log('Day :' + this.days)
//  //  console.log('First Day :' + this.firstDay.getDate)
//  //  console.log('Last Day :' + this.lastDay)
//  //  console.log(this.currentDate)
//  //}

//  dayArray: string[] = [];
//  getDayArray() {
//    this.dayArray = this.data.gendaysArray();
//  }
//  //End of Methods
//}
//import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
//import { DataService } from 'src/app/service/data.service';
//import { MatPaginator } from '@angular/material/paginator';
//import { MatSort } from '@angular/material/sort';
//import { MatTableDataSource } from '@angular/material/table';
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { DatePipe } from '@angular/common';

//@Component({
//  selector: 'app-attendancepage',
//  templateUrl: './attendancepage.component.html',
//  styleUrls: ['./attendancepage.component.css']
//})
//export class AttendancepageComponent implements OnInit, AfterViewInit {

//  //Components Shit

//  constructor(public datepipe: DatePipe, private data: DataService, public dialog: MatDialog) {
//    this.dataSource = new MatTableDataSource(this.emp);
//  }

//  ngOnInit(): void {
//    this.pullAllEmp();
//    this.getDate();
//    this.getfirstDay();
//    this.getlastDay();
//    this.getDayArray();
//  }

//  ngAfterViewInit() {
//    this.dataSource.paginator = this.paginator;
//    this.dataSource.sort = this.sort;
//  }

//  //Table Declarations
//  //Fucking fix Column Visibility

//  columns: any;
//  maxColumns: string[] = ['emp_id', 'emp_name', 'emp_position', 'emp_start_date', 'emp_status', 'emp_last_mod_date', 'emp_last_mod_by', 'actions'];
//  minColumns: string[] = ['emp_name', 'emp_position', 'emp_start_date', 'emp_status', 'actions'];

//  dataSource: MatTableDataSource<any>;
//  empInfo: any = {};
//  emp: any;

//  //Table shit

//  @ViewChild(MatPaginator) paginator!: MatPaginator;
//  @ViewChild(MatSort) sort!: MatSort;

//  applyFilter(event: Event) {
//    const filterValue = (event.target as HTMLInputElement).value;
//    this.dataSource.filter = filterValue;
//  }

//  //Pull Employees

//  pullAllEmp() {
//    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
//      this.emp = data.payload;
//      this.dataSource = new MatTableDataSource(this.emp);
//      this.ngAfterViewInit();
//      console.log(this.emp + ' From Employees Page: Method pullAllEmp');
//    });
//  }

//  //Edit Employee Dialog  

//  //editEmpDialog(
//  //  emp_id: any,
//  //  emp_name: any,
//  //  emp_position: any,
//  //  emp_start_date: any,
//  //  emp_status: any,
//  //  emp_last_mod_by: any): void {
//  //  const dialogRef = this.dialog.open(EditemployeeDialog, {
//  //    width: '30%',
//  //    height: '80%',
//  //    data: { emp_id: emp_id, emp_name: emp_name, emp_position: emp_position, emp_start_date: emp_start_date, emp_status: emp_status }
//  //  });

//  //  dialogRef.afterClosed().subscribe(result => {
//  //    this.empInfo = result;
//  //    this.editEmp();
//  //    console.log(this.empInfo + ' From Employees Page: Method editEmpDialog');
//  //  });
//  //}

//  //editEmp() {
//  //  this.data.sendApiRequest("editEmp", JSON.parse(JSON.stringify(this.empInfo))).subscribe((data: any) => {

//  //    //FIX FUCKING API PROBLEMS HERE

//  //  });
//  //  this.pullAllEmp();
//  //  console.log(this.empInfo + 'From Employees Page: Method editEmpDialog');
//  //}

//  //Add Employee Dialog  

//  //addEmpDialog(
//  //  emp_id: any,
//  //  emp_name: any,
//  //  emp_position: any,
//  //  emp_start_date: any,
//  //  emp_status: any,
//  //  emp_last_mod_by: any): void {
//  //  const dialogRef = this.dialog.open(AddemployeeDialog, {
//  //    width: '30%',
//  //    height: '80%',
//  //    data: { emp_name: emp_name, emp_position: emp_position, emp_start_date: emp_start_date, emp_status: emp_status, }
//  //  });

//  //  dialogRef.afterClosed().subscribe(result => {
//  //    this.empInfo = result;
//  //    this.addEmp();
//  //    console.log(this.empInfo + ' From Employees Page: Method addEmpDialog');
//  //  });
//  //}

//  //addEmp() {
//  //  this.data.sendApiRequest("addEmp", JSON.parse(JSON.stringify(this.empInfo))).subscribe((data: any) => {

//  //    //FIX FUCKING API PROBLEMS HERE

//  //  });
//  //  this.pullAllEmp();
//  //  console.log(this.empInfo + 'From Employees Page: Method addEmpDialog');
//  //}

//  delEmp(emp_id: any) {
//    this.empInfo.emp_id = emp_id;
//    console.log(this.empInfo.emp_id + ' From Employees Page: Method delEmp');
//    this.data.sendApiRequest("delEmp", this.empInfo).subscribe((data: any) => {


//      //FIX FUCKING API PROBLEMS HERE

//      this.emp = data.payload;
//      this.dataSource = new MatTableDataSource(this.emp);
//      this.ngAfterViewInit();
//    });
//  }

//  //Time Methods
//  date: any;

//  //Get Current Date
//  currentDate: any;
//  getDate() {
//    this.currentDate = this.data.getDate();
//    this.currentDate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
//  }

//  //Get First Date
//  firstDay: any;
//  getfirstDay() {
//    this.firstDay = this.data.getfirstDay();
//    this.firstDay = this.datepipe.transform(this.firstDay, 'yyyy-MM-dd');
//  }

//  //Get Last Date
//  lastDay: any;
//  getlastDay() {
//    this.lastDay = this.data.getlastDay();
//    this.lastDay = this.datepipe.transform(this.lastDay, 'yyyy-MM-dd');
//  }

//  //testDateLogic() {
//  //  //this.date = new Date();
//  //  //this.date = this.firstDay;
//  //  /*this.days = this.firstDay.getDate();*/

//  //  console.log('Date Content :' + this.date)
//  //  console.log('Day :' + this.days)
//  //  console.log('First Day :' + this.firstDay.getDate)
//  //  console.log('Last Day :' + this.lastDay)
//  //  console.log(this.currentDate)
//  //}

//  dayArray: string[] = [];
//  getDayArray() {
//    this.dayArray = this.data.gendaysArray();
//  }
//  //End of Methods
//}
