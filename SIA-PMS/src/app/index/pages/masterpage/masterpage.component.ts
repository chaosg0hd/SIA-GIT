import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface jsonTable {
  json_no: any;
  json_id: any;
  json_content: JSON;
  json_date_made: any;
  json_made_by: any;
}

@Component({
  selector: 'app-masterpage',
  templateUrl: './masterpage.component.html',
  styleUrls: ['./masterpage.component.css']
})
export class MasterpageComponent implements OnInit {

  //@ViewChild(MatSort) sort!: MatSort;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;

  jsonInfoTable: jsonTable[] = [];

  /*leave for testing*/
  /*editField: empTable[] = [];*/

  empInfo: any = {};

  jsonInfoTableDataSource = new MatTableDataSource(this.jsonInfoTable);
  jsonInfoTableLength = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
