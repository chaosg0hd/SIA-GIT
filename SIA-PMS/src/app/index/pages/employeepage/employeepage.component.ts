import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface empTable {
  emp_id: any;
  emp_firstname: any;
  emp_lastname: any;
  emp_address: any;
  emp_datebirth: any;
  emp_contact: any;
  emp_time_in: any;
  emp_time_out: any;
  emp_department: any;
  emp_is_archived: any;
  emp_sex: any;
  emp_position: any;
  emp_start_date: any;
  emp_status: any;
  emp_last_mod_date: any;
  emp_last_mod_by: any;
}

@Component({
  selector: 'app-employeepage',
  templateUrl: './employeepage.component.html',
  styleUrls: ['./employeepage.component.css']
})

export class EmployeepageComponent implements OnInit, AfterViewInit {


  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  empInfoTable: empTable[] = [];
  empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);


  //Table Declarations
  //Fucking fix Column Visibility
  //fucking redo how tables work

  empInfoTableColumns: string[] = [
    "emp_id",
    "emp_firstname",
    "emp_lastname",
    "emp_address",
    "emp_datebirth",
    "emp_contact",
    "emp_time_in",
    "emp_time_out",
    "emp_department",
    "emp_is_archived",
    "emp_sex",
    "emp_position",
    "emp_start_date",
    "emp_status",
    "emp_last_mod_date",
    "emp_last_mod_by",
    "actions"
  ];

    
  //Components Shit

  constructor(private data: DataService, public dialog: MatDialog) {  }

  ngOnInit(): void {
    this.pullAllEmp();
  }

  ngAfterViewInit() {
    this.empInfoTableDataSource.paginator = this.paginator;
    this.empInfoTableDataSource.sort = this.sort;
  }


  //Table shit

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.empInfoTableDataSource.filter = filterValue;
  }

  //Pull Employees

  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      this.empInfoTable = data.payload;
      console.log(this.empInfoTable);
      this.empInfoTableDataSource.data = this.empInfoTable;
      console.log(this.empInfoTableDataSource + ' From Dashboard Page: Method pullAllEmp');
    });
  }

  //Edit Employee Dialog
  //FUCKING TURN IT TO AN ARRAY


  //editEmpDialog(
  //  emp_id: any,
  //  emp_name: any,
  //  emp_position: any,
  //  emp_start_date: any,
  //  emp_status: any,
  //  emp_last_mod_by: any ): void {
  //  const dialogRef = this.dialog.open(EditemployeeDialog, {
  //    width: '30%',
  //    height: '80%',
  //    data: { emp_id: emp_id, emp_name: emp_name, emp_position: emp_position, emp_start_date: emp_start_date, emp_status: emp_status}
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    this.empInfo = result;
  //    this.editEmp();
  //    console.log(this.empInfo + ' From Employees Page: Method editEmpDialog');      
  //  });
  //}

  //editEmp() {   
  //  this.data.sendApiRequest("editEmp", JSON.parse(JSON.stringify(this.empInfo))).subscribe((data: any) => {

  //  //FIX FUCKING API PROBLEMS HERE

  //  });
  //  this.pullAllEmp();
  //  this.ngAfterViewInit()
  //  console.log(this.empInfo + 'From Employees Page: Method editEmpDialog');
  //}

  ////Add Employee Dialog  

  //addEmpDialog(
  //  emp_id: any,
  //  emp_name: any,
  //  emp_position: any,
  //  emp_start_date: any,
  //  emp_status: any,
  //  emp_last_mod_by : any  ): void {
  //  const dialogRef = this.dialog.open(AddemployeeDialog, {
  //    width: '30%',
  //    height: '80%',
  //    data: { emp_name: emp_name, emp_position: emp_position, emp_start_date: emp_start_date, emp_status: emp_status, }
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    this.empInfo = result;
  //    this.addEmp();
  //    console.log(this.empInfo + ' From Employees Page: Method addEmpDialog');
  //  });
  //}

  //addEmp() {
  //  this.data.sendApiRequest("addEmp", JSON.parse(JSON.stringify(this.empInfo))).subscribe((data: any) => {

  //  //FIX FUCKING API PROBLEMS HERE

  //  });
  //  this.pullAllEmp();
  //  console.log(this.empInfo + 'From Employees Page: Method addEmpDialog');
  //}

  //delEmp(emp_id: any) {
  //  this.empInfo.emp_id = emp_id;
  //  console.log(this.empInfo.emp_id + ' From Employees Page: Method delEmp');
  //  this.data.sendApiRequest("delEmp", this.empInfo).subscribe((data: any) => {


  //    //FIX FUCKING API PROBLEMS HERE

  //    this.emp = data.payload;
  //    this.dataSource = new MatTableDataSource(this.emp);
  //    this.ngAfterViewInit();
  //  });
  //} 


  //End of Methods
}

//End of Main Component

//SubComponents

@Component({
  selector: 'editemployee',
  templateUrl: 'editemployee.html',
})
export class EditemployeeDialog {

  constructor(
    public dialogRef: MatDialogRef<EditemployeeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'addemployee',
  templateUrl: 'addemployee.html',
})
export class AddemployeeDialog {

  constructor(
    public dialogRef: MatDialogRef<AddemployeeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

//Interfaces

//Replace this, dont fcking need it


export interface DialogData {
  emp_id: any;
  emp_name: any;
  emp_position: any;
  emp_start_date: any;
  emp_status: any;
}
