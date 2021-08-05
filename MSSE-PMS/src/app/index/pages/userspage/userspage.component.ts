import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-userspage',
  templateUrl: './userspage.component.html',
  styleUrls: ['./userspage.component.css']
})






export class UserspageComponent implements OnInit, AfterViewInit {


  userpayload: UserPayload [] = [];

  displayedColumns: string[] = 
  [
    "column1",
    "column2",
    "column3"

  ];
  dataSource = new MatTableDataSource(this.userpayload);

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor
  (
    public ds: DataService
  ) { }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void {
    this.pullUsers();
  }

  pullUsers()
  {
    this.ds.sendApiRequest("users", null).subscribe((data: any) => {
      this.userpayload = data.payload;
      this.dataSource.data = this.userpayload;
    })
  }


}


export interface PeriodicElement {

}

export interface UserPayload
{
user_name: any;
user_password: any;
user_date: any;
}