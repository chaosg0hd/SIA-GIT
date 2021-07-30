import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { DatePipe, Time } from '@angular/common';
import { LowerCasePipe } from '@angular/common';


import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { RouterModule } from '@angular/router';


export interface aPTable {
  ap_no: string;
  ap_name: string;
  ap_arguments: string;
}


@Component({
  selector: 'app-additionpage',
  templateUrl: './additionpage.component.html',
  styleUrls: ['./additionpage.component.css']
})
export class AdditionpageComponent implements OnInit {

  constructor(public data: DataService) { }

  ngOnInit(): void {
    this.pullAllAP();
  }
  
  aPInfoTable: aPTable[] = [];
  aPInfoTableDataSource = new MatTableDataSource(this.aPInfoTable);

  pullAllAP() {
    this.data.sendApiRequest("pullAllAP", null).subscribe((data: any) => {
      this.aPInfoTable = data.payload;
      this.aPInfoTableDataSource = data.payload;
      console.log(this.aPInfoTable + ' From DTR Page: Method pullAllAP');
    });
  }

  //Table Columns

  displayedColumns: string[] = ['Added Payments Name', 'Added Payments Arguments'];




  
}
