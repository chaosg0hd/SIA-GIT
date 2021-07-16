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

export interface dtrTable {
  dtr_no: any;
  dtr_id: any;
  emp_id: any;
  dtr_content: JSON;
  dtr_month_year: any;
}

@Component({
  selector: 'app-dailytimerecordpage',
  templateUrl: './dailytimerecordpage.component.html',
  styleUrls: ['./dailytimerecordpage.component.css']
})
export class DailytimerecordpageComponent implements OnInit {

  empInfoTable: empTable[] = [];
  dtrInfoTable: dtrTable[] = [];

  empInfo: any = {};
  dtrInfo: any = {};

  constructor(private data: DataService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getDate();
    this.pullAllEmp();   
  }

  //Methods

  //Pull Emps
  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      this.empInfoTable = data.payload;
      console.log(this.empInfoTable);
      this.pullAllDTR();
    });
  }

  //Pull DTR
  pullAllDTR() {
    this.data.sendApiRequest("pullAllDTR", null).subscribe((data: any) => {
      this.dtrInfoTable = data.payload;
      console.log(this.dtrInfoTable);
      this.generateDTR();
    });
  }

  //Add DTR
  async addemptyDTR(emp_id: any, month_year: any ) {
    this.dtrInfo = {};
    this.dtrInfo.emp_id = emp_id;
    this.dtrInfo.month_year = month_year;
    //IMPLEMENT DTR ID Here
    /*this.dtrInfo.dtr_id = */
    console.log(this.dtrInfo + ' From Dashboard Page: Method addEmp');
    this.data.sendApiRequest("addDTR", this.dtrInfo).subscribe((data: any) => { });
  }



  //Need to ReImplement Filter 
  ////Filter 
  //applyFilter(event: Event) {
  //  const filterValue = (event.target as HTMLInputElement).value;
  //  this.empInfoTableDataSource.filter = filterValue;
  //}


  //Get Current Month
  currentDate: any;
  month: any;

  getDate() {
    //Sets Date
    this.currentDate = this.data.getDate();

    this.month = new Date(this.currentDate)
    console.log(this.month + "From Attendance Page: Method getDate")
    this.getDaysArray(Number(this.datepipe.transform(this.month, 'MM')) -1)
  }

  dayArray: any;
  dayArray1stHalf: any
  dayArray2ndHalf: any

  getDaysArray(month: number) {
    this.dayArray = this.data.generateDaysArray(month);
    console.log(this.dayArray + 'From Attendance Page: Method getDayArray');
    this.dayArray1stHalf = this.dayArray.slice(0, this.dayArray.length / 2);
    console.log(this.dayArray1stHalf + 'From Attendance Page: Method getDayArray');
    this.dayArray2ndHalf = this.dayArray.slice(this.dayArray.length / 2);
    console.log(this.dayArray2ndHalf + 'From Attendance Page: Method getDayArray');
  }

  updateList(argument1: any, argument2: any, argument3: any) {
    console.log(argument1 + '+++++++++ From Attendance Page: Method getDayArray');
    console.log(argument2 + '+++++++++ From Attendance Page: Method getDayArray');
    console.log(argument3 + '+++++++++ From Attendance Page: Method getDayArray');
  }

  generateDTR() {
    var monthyear='july_2021'
    console.log('OUTERLOOP');
    for (let empInfoTable of this.empInfoTable) {
      console.log('OUTERLOOP');

      for (let dtrInfoTable of this.dtrInfoTable) {
        console.log('INNER LOOP');
        if (dtrInfoTable.dtr_month_year == monthyear && dtrInfoTable.emp_id == empInfoTable.emp_id) {
          console.log('Matched Found @' + monthyear + dtrInfoTable.emp_id)
          
        }
      }
    }
  }



  

}
