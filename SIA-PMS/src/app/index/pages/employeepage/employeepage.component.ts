import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employeepage',
  templateUrl: './employeepage.component.html',
  styleUrls: ['./employeepage.component.css']
})

export class EmployeepageComponent implements OnInit /*, AfterViewInit*/ {
    
  //Components Shit

  constructor(private data: DataService, public dialog: MatDialog) {    
    this.dataSource = new MatTableDataSource(this.emp);
  }

  ngOnInit(): void {
    this.pullAllEmp();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Table Declarations
  //Fucking fix Column Visibility
  //fucking redo how tables work


  columns: any;
  maxColumns: string[] = ['emp_id', 'emp_name', 'emp_position', 'emp_start_date', 'emp_status','emp_last_mod_date','emp_last_mod_by','actions'];
  minColumns: string[] = ['emp_name', 'emp_position', 'emp_start_date', 'emp_status', 'actions'];

  dataSource: MatTableDataSource<any>;
  empInfo: any = {};
  emp: any;

  //Table shit

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  //Pull Employees

  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      this.emp = data.payload;
      this.dataSource = new MatTableDataSource(this.emp);
      this.ngAfterViewInit();
      console.log(this.emp + ' From Employees Page: Method pullAllEmp');
    });
    this.ngAfterViewInit();
  }  

  //Edit Employee Dialog
  //FUCKING TURN IT TO AN ARRAY


  editEmpDialog(
    emp_id: any,
    emp_name: any,
    emp_position: any,
    emp_start_date: any,
    emp_status: any,
    emp_last_mod_by: any ): void {
    const dialogRef = this.dialog.open(EditemployeeDialog, {
      width: '30%',
      height: '80%',
      data: { emp_id: emp_id, emp_name: emp_name, emp_position: emp_position, emp_start_date: emp_start_date, emp_status: emp_status}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.empInfo = result;
      this.editEmp();
      console.log(this.empInfo + ' From Employees Page: Method editEmpDialog');      
    });
  }

  editEmp() {   
    this.data.sendApiRequest("editEmp", JSON.parse(JSON.stringify(this.empInfo))).subscribe((data: any) => {

    //FIX FUCKING API PROBLEMS HERE

    });
    this.pullAllEmp();
    console.log(this.empInfo + 'From Employees Page: Method editEmpDialog');
  }

  //Add Employee Dialog  

  addEmpDialog(
    emp_id: any,
    emp_name: any,
    emp_position: any,
    emp_start_date: any,
    emp_status: any,
    emp_last_mod_by : any  ): void {
    const dialogRef = this.dialog.open(AddemployeeDialog, {
      width: '30%',
      height: '80%',
      data: { emp_name: emp_name, emp_position: emp_position, emp_start_date: emp_start_date, emp_status: emp_status, }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.empInfo = result;
      this.addEmp();
      console.log(this.empInfo + ' From Employees Page: Method addEmpDialog');
    });
  }

  addEmp() {
    this.data.sendApiRequest("addEmp", JSON.parse(JSON.stringify(this.empInfo))).subscribe((data: any) => {

    //FIX FUCKING API PROBLEMS HERE

    });
    this.pullAllEmp();
    console.log(this.empInfo + 'From Employees Page: Method addEmpDialog');
  }

  delEmp(emp_id: any) {
    this.empInfo.emp_id = emp_id;
    console.log(this.empInfo.emp_id + ' From Employees Page: Method delEmp');
    this.data.sendApiRequest("delEmp", this.empInfo).subscribe((data: any) => {


      //FIX FUCKING API PROBLEMS HERE

      this.emp = data.payload;
      this.dataSource = new MatTableDataSource(this.emp);
      this.ngAfterViewInit();
    });
  } 


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
