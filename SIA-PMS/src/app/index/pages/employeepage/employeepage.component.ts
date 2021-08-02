import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

//INTERFACE

export interface DialogData {
  emp_id: any;
  emp_name: any;
  emp_position: any;
  emp_start_date: any;
  emp_status: any;
}

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

  //Constructors Here

  constructor(private data: DataService, private datepipe: DatePipe, public dialog: MatDialog) { }

  //View Child Goes Here

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //ngLifeCycle Goes Here

  ngOnInit(): void {
    this.getUser();
    this.pullAllEmp();      
  }

  ngAfterViewInit() {
    this.empInfoTableDataSource.paginator = this.paginator;
    this.empInfoTableDataSource.sort = this.sort;
  }

  //ngOnInitFunctions

  //Get User Credentials

  user: any;

  getUser() {
    this.user = localStorage.getItem('Name');
  }

  //Pull Employees

  empInfoTable: empTable[] = [];
  empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);
  empInfoTableLastNo: any;

  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      console.log(data + 'From Emp Page: Method pullAllEmp');
      this.empInfoTable = data.payload;
      console.log(this.empInfoTable + 'From Emp Page: Method pullAllEmp');
      this.empInfoTableDataSource.data = this.empInfoTable;
      console.log(this.empInfoTableDataSource + ' From Emp Page: Method pullAllEmp');
      this.empInfoTableLastNo = this.empInfoTable[this.empInfoTable.length - 1].emp_no;
      console.log(this.empInfoTableLastNo);
    });
  }

  //Main Table Functions

  //Table Columns Properties

  empInfoTableColumnsJSON: empTableColumnProp[] = [
    { "columnName": "emp_name", "columnPrettyName": "Employee Name", "columnisSticky": true, },
    { "columnName": "emp_firstname", "columnPrettyName": "Firstname", "columnisSticky": true, },
    { "columnName": "emp_lastname", "columnPrettyName": "Lastname", "columnisSticky": true, },
    { "columnName": "emp_no", "columnPrettyName": "Emp no", "columnisSticky": false, },
    { "columnName": "emp_id", "columnPrettyName": "Emp ID", "columnisSticky": false, },
    { "columnName": "emp_middle", "columnPrettyName": "MI", "columnisSticky": false, },
    { "columnName": "emp_address", "columnPrettyName": "Address", "columnisSticky": false, },
    { "columnName": "emp_sex", "columnPrettyName": "Sex", "columnisSticky": false, },
    { "columnName": "emp_datebirth", "columnPrettyName": "Date of Birth", "columnisSticky": false, },
    { "columnName": "emp_contact", "columnPrettyName": "Contact Info", "columnisSticky": false, },
    { "columnName": "emp_time_in", "columnPrettyName": "Time-in", "columnisSticky": false, },
    { "columnName": "emp_time_out", "columnPrettyName": "Time-out", "columnisSticky": false, },
    { "columnName": "emp_department", "columnPrettyName": "Department", "columnisSticky": false, },
    { "columnName": "emp_rate", "columnPrettyName": "Rate", "columnisSticky": false, },
    { "columnName": "emp_start_date", "columnPrettyName": "Date Started", "columnisSticky": false, },
    { "columnName": "emp_status", "columnPrettyName": "Status", "columnisSticky": false, },
    { "columnName": "emp_position", "columnPrettyName": "Position", "columnisSticky": false, },
    { "columnName": "emp_last_mod_date", "columnPrettyName": "Date Last Modified", "columnisSticky": false, },
    { "columnName": "emp_last_mod_by", "columnPrettyName": "Last Modified By", "columnisSticky": false, },
    { "columnName": "emp_is_archived", "columnPrettyName": "Archive Status", "columnisSticky": false, },
  ]

  //Table Columns

  empInfoTableColumns: string[] = [
    "emp_firstname",
    "emp_lastname",
    "emp_id",
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

  //Maximized Table Columns

  maxTableSize: string[] = [
    "emp_firstname",
    "emp_lastname",
    "emp_no",
    "emp_id",
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
    "emp_firstname",
    "emp_lastname",
    "emp_id",
    "emp_status",
    "emp_contact",
    "emp_position",
    "emp_department",
    "emp_rate",
    "emp_time_in",
    "emp_time_out",
    "actions"
  ]


  //Default Table Columns
  defaultTableSize: string[] = [
    "emp_firstname",
    "emp_lastname",
    "emp_id",
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

  //Table Functions

  empInfo: any = {};
  startDate = new Date(1995, 8, 27);
  tabIndex = 0;

  
  //////////////////////////////////// DO NOT COPY ////////////////////////////////////////////////
  //////////////////////////////////// DO NOT COPY ////////////////////////////////////////////////
  //////////////////////////////////// DO NOT COPY ////////////////////////////////////////////////

  //Rapid Edit Logic
  updateList(id: string, property: string, event: any) {

    //Fix API Problems still causing problems
    console.log(event + 'From Employees Page: Method updateList');
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
  
  //Edit Employees

  async editEmp(editEmpInfo: any) {
    this.empInfo.emp_last_mod_by = this.user
    console.log(editEmpInfo + ' From Emp Page: Method editEmp');
    this.data.sendApiRequest("editEmp", editEmpInfo).subscribe((data: any) => {
        this.empInfoTable = data.payload;
        console.log(this.empInfoTable);
        this.empInfoTableDataSource.data = this.empInfoTable;
      console.log(this.empInfoTableDataSource + ' From Emp Page: Method editEmp');
      });
  }

  //----------------------------------------------------------------------------------------------------------------------
  //Add Employees

  async addEmp(emp_no: number) {

    emp_no = emp_no + 1

    this.empInfo = {}
    
    this.empInfoTableLastNo = emp_no;
    this.empInfo.emp_no = emp_no
    this.empInfo.emp_start_date = this.startDate;
    this.empInfo.emp_datebirth = this.startDate;
    this.empInfo.emp_id = (this.data.genID(emp_no));
    this.empInfo.emp_last_mod_by = this.user;
    this.empInfo.emp_time_in = '00:00'
    this.empInfo.emp_time_out = '00:00'

    console.log(this.empInfo + ' From Employee Page: Method addEmp');

    this.empInfoTableDataSource.data.push(this.empInfo);

    this.empInfoTableDataSource.data = this.empInfoTableDataSource.data.slice();

    console.log(this.data);

    this.data.sendApiRequest("addEmp", this.empInfo).subscribe((data: any) => {

      
    });
  }

  //Del Employees

  async delEmp(emp_id: any) {

    this.empInfo = {};

    this.empInfo.emp_id = emp_id;

    console.log(emp_id)
    this.data.sendApiRequest("delEmp", this.empInfo).subscribe((data: any) => {
      this.empInfoTable = data.payload;
      console.log(this.empInfoTable);
      this.empInfoTableDataSource.data = this.empInfoTable;
      console.log(this.empInfoTableDataSource + ' From Dashboard Page: Method editEmp');

      this.ngOnInit();
    });
  }  


  //Filter Employees

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.empInfoTableDataSource.filter = filterValue;
  }

  //Set Table Size

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

  //TabIndex FunctionS

  tabIndexStart() {
    this.tabIndex = 0;
    //THIS IS TOO MAINGAY
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

//BACKREAD MUNA BAGO MAGDAGDAG NG FUNCTION DITO




