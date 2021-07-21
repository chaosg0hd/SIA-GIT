import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface empTable {
  emp_no: any;
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

export interface empTableColumnProp {
  columnName: any;
  columnPrettyName: any;
  columnisSticky: boolean;
}

@Component({
  selector: 'app-employeepage',
  templateUrl: './employeepage.component.html',
  styleUrls: ['./employeepage.component.css']
})

export class EmployeepageComponent implements OnInit{


  //@ViewChild(MatSort) sort!: MatSort;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;

  empInfoTable: empTable[] = [];

  /*leave for testing*/ 
  /*editField: empTable[] = [];*/

  empInfo: any = {};

  empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);
  empInfoTableLength = 0;

  
  //StartDate
  //Delete this

  startDate = new Date(1990, 1, 1);

  //Table Declarations
  //Fucking fix Column Visibility
  //fucking redo how tables work
  //Fixed how tables work
  //Could be Better
  //Actually Just Merge

  tabIndex = 0;

  

  //Table Columns Properties

  empInfoTableColumnsJSON: empTableColumnProp[] = [
    { "columnName": "emp_no", "columnPrettyName": "Emp no", "columnisSticky": false, },
    { "columnName": "emp_id", "columnPrettyName": "Emp ID", "columnisSticky": false, },
    { "columnName": "emp_name", "columnPrettyName": "Employee Name", "columnisSticky": true, },
    { "columnName": "emp_firstname", "columnPrettyName": "Firstname", "columnisSticky": false, },
    { "columnName": "emp_lastname", "columnPrettyName": "Lastname", "columnisSticky": false, },
    { "columnName": "emp_middle", "columnPrettyName": "MI", "columnisSticky": false, },
    { "columnName": "emp_address", "columnPrettyName": "Address", "columnisSticky": false,},
    { "columnName": "emp_sex", "columnPrettyName": "Sex", "columnisSticky": false,},
    { "columnName": "emp_datebirth", "columnPrettyName": "Date of Birth", "columnisSticky": false,},
    { "columnName": "emp_contact", "columnPrettyName": "Contact Info", "columnisSticky": false, },
    { "columnName": "emp_time_in", "columnPrettyName": "Time-in", "columnisSticky": false, },
    { "columnName": "emp_time_out", "columnPrettyName": "Time-out", "columnisSticky": false, },
    { "columnName": "emp_department", "columnPrettyName": "Department", "columnisSticky": false, },
    { "columnName": "emp_rate", "columnPrettyName": "Rate", "columnisSticky": false, },
    { "columnName": "emp_start_date", "columnPrettyName": "Date Started", "columnisSticky": false, },
    { "columnName": "emp_status", "columnPrettyName": "Status", "columnisSticky": false, },
    { "columnName": "emp_position", "columnPrettyName": "Position", "columnisSticky": false, },
    { "columnName": "emp_last_mod_date", "columnPrettyName": "Date Last Modified", "columnisSticky": false,},
    { "columnName": "emp_last_mod_by", "columnPrettyName": "Last Modified By", "columnisSticky": false, },
    { "columnName": "emp_is_archived", "columnPrettyName": "Archive Status", "columnisSticky": false, },
  ]

  //Maximized Table Columns
  maxTableSize: string[] = [
    "emp_no",
    "emp_id",
    "emp_name",
    "emp_firstname",
    "emp_lastname",
    "emp_status",
    "emp_address",
    "emp_sex",
    "emp_datebirth",
    "emp_contact",
    "emp_position",
    "emp_department",
    "emp_rate",
    "emp_start_date",
    "emp_time_in",
    "emp_time_out",
    "emp_last_mod_date",
    "emp_last_mod_by",
    "actions"
  ]

  //Minimized Table Columns
  minTableSize: string[] = [
    "emp_id",
    "emp_name",
    "emp_status",
    "emp_contact",
    "emp_position",
    "emp_department",
    "emp_rate",
    "emp_time_in",
    "emp_time_out",
    "actions"
  ]

  defaultTableSize: string[] = [
    "emp_id",
    "emp_name",
    "emp_status",
    "emp_address",
    "emp_sex",
    "emp_datebirth",
    "emp_contact",
    "emp_position",
    "emp_department",
    "emp_rate",
    "emp_start_date",
    "emp_time_in",
    "emp_time_out",
    "actions"
  ]


  //Default Table Columns
  empInfoTableColumns: string[] = [
    "emp_id",
    "emp_name",
    "emp_status",
    "emp_address",
    "emp_sex",
    "emp_datebirth",
    "emp_contact",
    "emp_position",
    "emp_department",
    "emp_rate",
    "emp_start_date",
    "emp_time_in",
    "emp_time_out",
    "actions"
  ]
    
  //Components Shit
  //Remove MatDialog when able
  constructor(private data: DataService, private datepipe: DatePipe, public dialog: MatDialog) {  }
    
  ngOnInit(): void {
    this.pullAllEmp();
    this.getUser();
  }

  user: any;
  getUser() {
    this.user = localStorage.getItem('Name');
  }

  //Sad na hindi ko apply pagination dito
  //ngAfterViewInit() {
  //  this.empInfoTableDataSource.paginator = this.paginator;
  //  this.empInfoTableDataSource.sort = this.sort;
  //}

  //Methods

  //Pull Employees

  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      this.empInfoTable = data.payload;      
      console.log(this.empInfoTable);      
      console.log(this.empInfoTableLength + 'From Dashboard Page: Method pullAllEmp');
      this.empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);
      this.empInfoTableDataSource.data = this.empInfoTable;
      this.empInfoTableLength = this.empInfoTableDataSource.data.length;
      console.log(this.empInfoTableDataSource + ' From Dashboard Page: Method pullAllEmp');
    });
    
  }

  //Edit Employees

  async editEmp(editEmpInfo: any) {
    this.empInfo.emp_last_mod_by = this.user
    console.log(editEmpInfo + ' From Dashboard Page: Method editEmp');
    this.data.sendApiRequest("editEmp", editEmpInfo).subscribe((data: any) => {
        this.empInfoTable = data.payload;
        console.log(this.empInfoTable);
        this.empInfoTableDataSource.data = this.empInfoTable;
        console.log(this.empInfoTableDataSource + ' From Dashboard Page: Method editEmp');
      });
  }

  //Add Employees

  //async addEmp(emp_id: number) {
  //  this.empInfo = {}
  //  emp_id = emp_id + 1;
  //  this.empInfo.emp_id = ("XX-" + emp_id)
  //  console.log(this.empInfo + ' From Dashboard Page: Method addEmp');    
  //  this.data.sendApiRequest("addEmp", this.empInfo).subscribe((data: any) => {S
  //    this.empInfoTable = data.payload;
  //    console.log(this.empInfoTable);
  //    this.empInfoTableDataSource.data = this.empInfoTable;
  //    console.log(this.empInfoTableDataSource + ' From Employee Page: Method addEmp');
  //    this.pullAllEmp();
  //  });
  //}

  async addEmp(emp_id: number) {
    this.empInfo = {}
    emp_id = emp_id + 1;
    this.empInfo.emp_start_date = this.startDate;
    this.empInfo.emp_datebirth = this.startDate;    
    this.empInfo.emp_id = ("XX-" + emp_id);
    this.empInfo.emp_time_in = '00:00:00';
    this.empInfo.emp_time_out = '00:00:00';
    this.empInfo.emp_last_mod_by = this.user;    
    console.log(this.empInfo + ' From Dashboard Page: Method addEmp');
    this.empInfoTableDataSource.data.push(this.empInfo);
    this.empInfoTableDataSource.data = this.empInfoTableDataSource.data.slice();
    this.empInfoTableLength = this.empInfoTableDataSource.data.length;
    console.log(this.data);
    this.data.sendApiRequest("addEmp", this.empInfo).subscribe((data: any) => {
      
    });
  }


  //Del Employees

  async delEmp(editEmpInfo: any) {
    console.log(editEmpInfo)
    this.data.sendApiRequest("delEmp", editEmpInfo).subscribe((data: any) => {
      this.empInfoTable = data.payload;
      console.log(this.empInfoTable);
      this.empInfoTableDataSource.data = this.empInfoTable;
      console.log(this.empInfoTableDataSource + ' From Dashboard Page: Method editEmp');
    });
  }  

  //Not Really Needed
  //Create Table

  tableCreate() {
    //for (let columns of this.empInfoTableColumnsJSON) {
    //  this.empInfoTableColumns.push(columns.columnName);      
    //  console.log(this.empInfoTableColumns + ' From Dashboard Page: tableCreate');
    //}
    console.log(this.empInfoTableColumns + ' From Dashboard Page: tableCreate');
  }

  //Filter 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.empInfoTableDataSource.filter = filterValue;
  }

  isMin: boolean = false
  isMax: boolean = false

  tableMaxWidth = 150;
  tableWidth = 150;

  minTable() {
    if (this.isMin == false) {
      this.empInfoTableColumns = this.minTableSize;
      this.tableMaxWidth = 100;
      this.isMin = true;
    }
    else {
      this.empInfoTableColumns = this.defaultTableSize;
      this.tableMaxWidth = 150;
      this.tableWidth = 150;
      this.isMin = false;
    }    
  }

  maxTable() {
    if (this.isMax == false) {
      this.empInfoTableColumns = this.maxTableSize;
      this.tableWidth = 200;
      this.tableMaxWidth = 200;
      this.isMax = true;
    }
    else {
      this.empInfoTableColumns = this.defaultTableSize;
      this.tableMaxWidth = 150;
      this.tableWidth = 150;
      this.isMax = false;
    }    
  }


  tabIndexStart() {
    this.tabIndex = 0;
    //console.log(this.tabIndex + ' From Employees Page: Method tabIndex');
    return <number>this.tabIndex;

  }

  tabIndexInc(index: number) {
    if (this.tabIndex == 0) {
      this.tabIndex = 1
    }
    else {
      this.tabIndex = this.tabIndex + 1;
    }
    //console.log(this.tabIndex + ' From Employees Page: Method tabIndex');
    return<number>this.tabIndex;
  }

  //Leave for testing only
  changeValue(id: string, property: string, event: any) {
    console.log(event.target.value, property, id);
  }

  //Rapid Edit Logic
  updateList(id: string, property: string, event: any) {

    //Fix API Problems still causing problems
    console.log(event);
    console.log(event.target.value, property, id + 'From Employees Page: Method updateList');

    //Improve Null Value Check
    if (event.target.value != "") {
      for (let empInfoTable of this.empInfoTable) {
        if (empInfoTable.emp_id == id) {
          console.log(empInfoTable.emp_id + ' From Employees Page: Method updateList');
          switch (property) {
            case "emp_id": {
              //emp_id should be unmodifiable but dunno            
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              break;
            }
            case "emp_firstname": {
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_id = id;
              this.empInfo.emp_firstname = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_lastname": {
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_id = id;
              this.empInfo.emp_lastname = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_address": {
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_id = id;
              this.empInfo.emp_address = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_sex": {
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_id = id;
              this.empInfo.emp_sex = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_datebirth": {
              console.log(event.target.value + ' ------------From Employees Page: Method updateList');
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_id = id;
              this.empInfo.emp_datebirth = this.datepipe.transform(event.target.value, 'yyyy-M-d');
              console.log('Date:' + this.empInfo.emp_datebirth + 'From Employees Page: Method updateList');
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_contact": {
              console.log(event.target.value + ' ------------From Employees Page: Method updateList');
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_id = id;
              this.empInfo.emp_contact = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_department": {
              console.log(event.target.value + 'From Employees Page: Method updateList');
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_id = id;
              this.empInfo.emp_department = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_start_date": {
              console.log(event.target.value + 'From Employees Page: Method updateList');
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_id = id;
              this.empInfo.emp_start_date = this.datepipe.transform(event.target.value, 'yyyy-M-d');
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_status": {
              console.log(event.target.value + 'From Employees Page: Method updateList');
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_id = id;
              this.empInfo.emp_status = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_rate": {
              console.log(event.target.value + 'From Employees Page: Method updateList');
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_id = id;
              this.empInfo.emp_rate = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            default: {
              console.log(property + ': No Argumments From Employees Page: Method updateList');
              break;
            }
          }
        }
      }
    }    
  }

  //Edit Employee Dialogconsole.log(this.editField)
  //FUCKING TURN IT TO AN ARRAY

  // pATULONG HERE JIV


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

//Maybe pag kelangan na pede na mag dialog data

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
