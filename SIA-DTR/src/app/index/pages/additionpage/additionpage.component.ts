import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-additionpage',
  templateUrl: './additionpage.component.html',
  styleUrls: ['./additionpage.component.css']
})
export class AdditionpageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SampledialogComponent, {
      width: '500px',
      height: '400px',
     
    });
}
}
@Component({
  selector: 'app-additionpage',
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
