import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  //reqinfo: any;
  //req: any;

  emp_id: any;
  emp_name: any;
  emp_position: any;
  emp_start_date: any;
  emp_status: any;
}

@Component({
  selector: 'app-employeepage',
  templateUrl: './employeepage.component.html',
  styleUrls: ['./employeepage.component.css']
})

export class EmployeepageComponent implements OnInit {

  //Variable Declarations
  reqInfo: any = {};
  req: any;

  emp_id: any;
  emp_name: any;
  emp_position: any;
  emp_start_date: any;
  emp_status: any;


  //Table Declaations
  displayedColumns: string[] = ['emp_id', 'emp_name', 'emp_position', 'emp_start_date', 'emp_status', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ds: DataService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.req);
  }

  ngOnInit(): void {
    this.pullAllEmp();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pullAllEmp() {
    this.ds.sendApiRequest("pullAllEmp", null ).subscribe((data : any) => {
      this.req = data.payload;
      this.dataSource = new MatTableDataSource(this.req);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  openDialog(emp_id: any, emp_name: any, emp_position: any, emp_start_date: any, emp_status: any): void {
    const dialogRef = this.dialog.open(EditemployeeDialog, {
      width: '30%',
      height: '80%',
      data: { emp_id: emp_id, emp_name: emp_name, emp_position: emp_position, emp_start_date: emp_start_date, emp_status: emp_status}
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      /*this.emp_id = result;*/
    });
  }

  //End of Methods
}

//End of Main Component

//SubComponent

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
