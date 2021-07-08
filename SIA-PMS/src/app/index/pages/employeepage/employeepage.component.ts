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

export class EmployeepageComponent implements OnInit, AfterViewInit {


  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  empInfoTable: empTable[] = [];

  /*leave for testing*/ 
  /*editField: empTable[] = [];*/

  empInfo: any = {};

  empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);

  
  //StartDate

  startDate = new Date(1990, 0, 1);

  //Table Declarations
  //Fucking fix Column Visibility
  //fucking redo how tables work
  //Fixed how tables work
  //Could be Better
  //Actually Just Merge

  tabIndex = 0;

  tableMaxWidth = 200;
  tableWidth = 150;

  //Table Columns Properties

  empInfoTableColumnsJSON : empTableColumnProp[] = [
    { "columnName": "emp_id", "columnPrettyName": "Employee ID", "columnisSticky": false, },
    { "columnName": "emp_name", "columnPrettyName": "Employee Name", "columnisSticky": true,},
    { "columnName": "emp_address", "columnPrettyName": "Address", "columnisSticky": false,},
    { "columnName": "emp_sex", "columnPrettyName": "Sex", "columnisSticky": false,},
    { "columnName": "emp_datebirth", "columnPrettyName": "Date of Birth", "columnisSticky": false,},
    { "columnName": "emp_contact", "columnPrettyName": "Contact Info", "columnisSticky": false,},
    { "columnName": "emp_department", "columnPrettyName": "Department", "columnisSticky": false,},
    { "columnName": "emp_start_date", "columnPrettyName": "Date Started", "columnisSticky": false, },
    { "columnName": "emp_status", "columnPrettyName": "Employee Status", "columnisSticky": false, },
    { "columnName": "emp_last_mod_date", "columnPrettyName": "Date Last Modified", "columnisSticky": false,},
    { "columnName": "emp_last_mod_by", "columnPrettyName": "Last Modified By", "columnisSticky": false,},
  ]

  //Maximized Table Columns
  maxTableSize: string[] = [
    "emp_id",
    "emp_name",
    "emp_address",
    "emp_sex",
    "emp_datebirth",
    "emp_contact",
    "emp_department",
    "emp_start_date",
    "emp_status",
    "emp_last_mod_date",
    "emp_last_mod_by",
    "actions"
  ]

  //Minimized Table Columns
  minTableSize: string[] = [
    "emp_id",
    "emp_name",
    "emp_status",
    "emp_address",
    "emp_sex",
    "emp_datebirth",
    "emp_contact",    
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
    "emp_department",
    "emp_start_date",    
    "actions"
  ]
    
  //Components Shit

  constructor(private data: DataService, public dialog: MatDialog) {  }
    
  ngOnInit(): void {
    this.pullAllEmp();
    this.tableCreate();
  }

  ngAfterViewInit() {
    this.empInfoTableDataSource.paginator = this.paginator;
    this.empInfoTableDataSource.sort = this.sort;
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

  //Edit Employees

  async editEmp(editEmpInfo: any) {    
    console.log(editEmpInfo + ' From Dashboard Page: Method editEmp');
    this.data.sendApiRequest("editEmp", editEmpInfo).subscribe((data: any) => {
        this.empInfoTable = data.payload;
        console.log(this.empInfoTable);
        this.empInfoTableDataSource.data = this.empInfoTable;
        console.log(this.empInfoTableDataSource + ' From Dashboard Page: Method editEmp');
      });
  } 


  //Del Employees

  delEmp(editEmpInfo: any) {
    console.log(editEmpInfo)
    this.data.sendApiRequest("delEmp", editEmpInfo).subscribe((data: any) => {
      this.empInfoTable = data.payload;
      console.log(this.empInfoTable);
      this.empInfoTableDataSource.data = this.empInfoTable;
      console.log(this.empInfoTableDataSource + ' From Dashboard Page: Method editEmp');
    });
  }

  //editForm = (products) => {
  //  this.prodInfo.item_id = products.item_id;
  //  this.prodInfo.item_name = products.item_name;
  //  this.prodInfo.item_desc = products.item_desc;
  //  this.prodInfo.item_quant = products.item_quant;
  //  this.prodInfo.date_expiry = products.date_expiry;
  //  this.prodInfo.item_price = products.item_price;
  //  this.prodInfo.item_minimum = products.item_minimum;
  //  this.prodInfo.remarks = products.remarks;
  //}
  //async editProduct(e) {
  //  e.preventDefault();
  //  this.prodInfo.modifiedBy1 = this.modifiedBy1
  //  console.log(this.prodInfo.modifiedBy1);
  //  await this.ds.sendApiRequest("editProduct", this.prodInfo).subscribe(res => {
  //    this.pullProducts();
  //  })
  //}

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

  minTable() {
    this.empInfoTableColumns = this.minTableSize;
    this.tableCreate();
    this.tableMaxWidth = 100;
  }

  maxTable() {
    this.empInfoTableColumns = this.maxTableSize;
    this.tableCreate();
    this.tableWidth = 200;
    this.tableMaxWidth = 200;
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

    //Fix API Problems
    console.log(event);
    console.log(event.target.value, property, id + 'From Employees Page: Method updateList');

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
              this.empInfo.emp_datebirth = event.target.value;
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
              this.empInfo.emp_start_date = event.target.value;
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
