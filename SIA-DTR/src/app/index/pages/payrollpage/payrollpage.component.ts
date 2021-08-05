import { Component, OnInit,Inject  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-payrollpage',
  templateUrl: './payrollpage.component.html',
  styleUrls: ['./payrollpage.component.css']
})
export class PayrollpageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SampledialogComponent, {
      width: '500px',
      height: '580px',
     
    });
}

}


@Component({
  selector: 'app-payrollpage',
  templateUrl: './sampledialog.component.html',
})
export class SampledialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SampledialogComponent>,
    ) {}

  onNoClick(): void {
    this.dialogRef.close();

    
  }

  
}