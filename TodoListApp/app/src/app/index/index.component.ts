import { Component, OnInit, ElementRef, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/data/service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe, Time } from '@angular/common';
import { LowerCasePipe } from '@angular/common';

export interface app_Table {
  prod_no: any;
  prod_name: any;
  prod_price: any;
  prod_cat: any;
  prod_quant: any;
  prod__desc: any;
  prod_created: any;
  prod_last_mod: any;
}




@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private data: DataService, public datepipe: DatePipe, public lowercasepipe: LowerCasePipe) { }

  ngOnInit(): void {
    this.getDate();
    this.pullAllTodo()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  currentDate: any;

  getDate() {
    this.currentDate = new Date(this.data.getDate());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  prodTable: app_Table[] = [];
  dataSource = new MatTableDataSource(this.prodTable);

  displayedColumns: string[] = ["prod_no", "prod_name", "prod_cat", "prod_quant", "prod_desc", "prod_price", "prod_created", "prod_last_mod", "Actions"]
  jsonData: any;

  //Pull Todo List
  pullAllTodo() {
    this.data.sendApiRequest("pullAllTodo", null).subscribe((data: any) => {
      console.log(data.payload);
      this.prodTable = data.payload;
      this.dataSource = new MatTableDataSource(this.prodTable);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.prodTable)      
    });
  }

  //Add Employees

  prodInfo: any = {}

  async addProd() {
    this.prodInfo = {}
    this.prodInfo.prod_name = ""
    this.prodInfo.prod_created = this.datepipe.transform(this.currentDate , 'YYYY-MM-dd')
    this.data.sendApiRequest("addTodo", this.prodInfo).subscribe((data: any) => {
      this.ngOnInit();
    });
  }

  updateList(no: string, property: string, event: any) {
    console.log(event + 'From Employees Page: Method updateList');
    console.log(event.target.value, property, no + 'From Employees Page: Method updateList');

    //Improve Null Value Check
    if (event.target.value != "") {
      for (let prodTable of this.prodTable) {
        if (prodTable.prod_no == no) {
          switch (property) {
            case "prod_name": {
              this.prodInfo = {};
              this.prodInfo.prod_no = no;
              this.prodInfo.prod_name = event.target.value;
              this.editProd(this.prodInfo);
              break;
            }
            case "prod_price": {
              this.prodInfo = {};
              this.prodInfo.prod_no = no;
              this.prodInfo.prod_price = event.target.value;
              this.editProd(this.prodInfo);
              break;
            }
            case "prod_cat": {
              this.prodInfo = {};
              this.prodInfo.prod_no = no;
              this.prodInfo.prod_cat = event.target.value;
              this.editProd(this.prodInfo);
              break;
            }
            case "prod_quant": {
              this.prodInfo = {};
              this.prodInfo.prod_no = no;
              this.prodInfo.prod_quant = event.target.value;
              this.editProd(this.prodInfo);
              break;
            }
            case "prod_desc": {
              this.prodInfo = {};
              this.prodInfo.prod_no = no;
              this.prodInfo.prod_desc = event.target.value;
              this.editProd(this.prodInfo);
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

  async editProd(prodInfo: any) {
    this.data.sendApiRequest("editTodo", prodInfo).subscribe((data: any) => {
      //this.empInfoTable = data.payload;
      //console.log(this.empInfoTable);
      //this.empInfoTableDataSource.data = this.empInfoTable;
    });
  }

  async delProd(prod_no: any) {

    this.prodInfo = {};
    this.prodInfo.prod_no = prod_no;
    this.data.sendApiRequest("delTodo", this.prodInfo).subscribe((data: any) => {
      this.ngOnInit();
    });
  }  


  //todo_name: any;
  //todo_date: any;

  //click() {

  //  if (this.todo_name !== null && this.todo_date !== null) {
  //    this.todo_date = this.datepipe.transform(this.todo_date, 'YYYY-MM-dd')
  //    console.log(this.todo_name, this.todo_date)
  //    this.todoListUser[0].user_JSON.push({ todo_name: this.todo_name, todo_date: this.todo_date })
  //  }
  //  else {
  //    console.log('Incomplete Data');
  //  }     
  //}

 



}
