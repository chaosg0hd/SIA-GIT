import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface wageTable {  
  wage_id: any;
  emp_id: any;
  wage_rate: any;
  wage_args: any;
  wage_last_mod_date: any;

  //item_desc: string;
  //item_quant: number;
  //date_expiry: string;
  //item_price: number;
  //item_minimum: number;
  //remarks: string;
}

export interface salaryTable {
  wage_id: any;
  emp_id: any;
  wage_rate: any;
  wage_args: any;
  wage_last_mod_date: any;

  //item_desc: string;
  //item_quant: number;
  //date_expiry: string;
  //item_price: number;
  //item_minimum: number;
  //remarks: string;
}

@Component({
  selector: 'app-wagespage',
  templateUrl: './wagespage.component.html',
  styleUrls: ['./wagespage.component.css']
})
export class WagespageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  wageInfoTable: wageTable[] = [];
  wageInfoTableDataSource = new MatTableDataSource(this.wageInfoTable);

  displayedColumns: string[] = [
    "wage_id",
    "emp_id",
    "wage_rate",
    "wage_args",
    "wage_last_mod_date",
    "ActionColumn",
  ];
  router: any;

  //modifiedBy: any;
  //modifiedBy1: any;

  wageInfo: any = {};
  wage: any;

  wage_id: any;
  emp_id: any;
  wage_rate: any;
  wage_args: any;
  wage_last_mod_date: any;

  constructor(public dialog: MatDialog, public datepipe: DatePipe, private data: DataService) { }


  ngAfterViewInit() {
    this.wageInfoTableDataSource.paginator = this.paginator;
    this.wageInfoTableDataSource.sort = this.sort;
  }
  ngOnInit() {
    this.pullAllWage();
    /*document.getElementById('name').innerHTML = localStorage.getItem("Fullname");*/
    //this.getName();
    //this.getName1();
  }

  pullAllWage() {
    this.data.sendApiRequest("pullAllWage", null).subscribe((data :any) => {
      this.wageInfoTable = data.payload;
      console.log(this.wageInfoTable);
      this.wageInfoTableDataSource.data = this.wageInfoTable;
      console.log(this.wageInfoTableDataSource);
    })
  }

}


