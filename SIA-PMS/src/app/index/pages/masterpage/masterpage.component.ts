import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DatePipe, Time } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface dtrTable {
  dtr_no: any;
  dtr_id: any;
  emp_id: any;
  dtr_content: JSON;
  dtr_month_year: any;
}

export interface dtrJSON {
  date: Date;
  am_time_in: Time;
  am_time_out: Time;
  pm_time_in: Time;
  pm_time_out: Time;
  ot_time_in: Time;
  ot_time_out: Time;
}



@Component({
  selector: 'app-masterpage',
  templateUrl: './masterpage.component.html',
  styleUrls: ['./masterpage.component.css']
})
export class MasterpageComponent implements OnInit {

  //@ViewChild(MatSort) sort!: MatSort;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;

  dtrInfoTable: dtrTable[] = [];

  dtrJSONInfo: dtrJSON[] = []; 

  /*leave for testing*/
  /*editField: empTable[] = [];*/

  dtrInfo: any = {};


  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.pullAllDTR();
    /*this.addDTR();*/

  }

  //pullAllEmp() {
  //  this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
  //    this.empInfoTable = data.payload;
  //    console.log(this.empInfoTable);
  //    console.log(this.empInfoTableLength + 'From Dashboard Page: Method pullAllEmp');
  //    this.empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);
  //    this.empInfoTableDataSource.data = this.empInfoTable;
  //    this.empInfoTableLength = this.empInfoTableDataSource.data.length;
  //    console.log(this.empInfoTableDataSource + ' From Dashboard Page: Method pullAllEmp');
  ////  });

  //}

  thisstring: any;

  pullAllDTR() {
    this.dtrInfoTable =[];
    this.data.sendApiRequest("pullAllDTR", null).subscribe((data: any) => {
      this.dtrInfoTable = data.payload;
      this.thisstring = data.payload.dtr_content;
      console.log(this.thisstring);
      console.log(data);
      console.log(this.dtrInfoTable);
      console.log(JSON.stringify(data.payload.dtr_content) + '+++++++++++++++++++++');

      var astring: string;

      astring = this.thisstring
      console.log(astring); 
      this.showDTR()
    })

  }

  jsonData: any;
  showDTR() {
    for (let dtrInfoTable of this.dtrInfoTable) {
      this.jsonData = dtrInfoTable.dtr_content;
      this.dtrJSONInfo = JSON.parse(this.jsonData);
     
      console.log(dtrInfoTable.dtr_content + "++++++fefefef++++++++++++++++++++++++");
      console.log(this.dtrJSONInfo + "++++++fefefef++++++++++++++++++++++++");
    }

    for (let dtrJSONInfo of this.dtrJSONInfo) {
      console.log(dtrJSONInfo.date);

      console.log(dtrJSONInfo.am_time_in);
    }
  }


  
  currentDate: any;

  //async addDTR() {
  //  this.currentDate = this.data.getDate();
  //  this.dtrInfo = {}
  //  console.log(this.currentDate);
    
  //  this.dtrJSONInfo = [{ date: this.currentDate, am_time_in: this.currentDate, am_time_out: this.currentDate, pm_time_in: this.currentDate, pm_time_out: this.currentDate, ot_time_in: this.currentDate, ot_time_out: this.currentDate }, { date: this.currentDate, am_time_in: this.currentDate, am_time_out: this.currentDate, pm_time_in: this.currentDate, pm_time_out: this.currentDate, ot_time_in: this.currentDate, ot_time_out: this.currentDate }];
  //  var json ;

  //  json = JSON.stringify(this.dtrJSONInfo);
  //  var emp_id = 'XX-01';
  //  this.dtrInfo.dtr_id = emp_id+'_'+'july_2021';
  //  this.dtrInfo.emp_id = emp_id;
  //  this.dtrInfo.dtr_content = json;

  //  console.log(this.dtrInfo + ' From Dashboard Page: Method addEmp');
  //  this.data.sendApiRequest("addDTR", this.dtrInfo).subscribe((data: any) => {
  //    console.log(this.dtrInfo.dtr_content)

  //    console.log(JSON.parse(this.dtrInfo.dtr_content))

  //  });
  //}


}
