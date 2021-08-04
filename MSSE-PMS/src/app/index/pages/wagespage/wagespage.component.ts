import { AfterViewInit, ElementRef, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { DatePipe, Time } from '@angular/common';
import { LowerCasePipe } from '@angular/common';
import jspdf from 'jspdf';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { RouterModule } from '@angular/router';
import html2canvas from 'html2canvas';


export interface empTable {
  emp_id: string;
  emp_firstname: string;
  emp_lastname: string;
  emp_rate: number;
  emp_attendance: attendanceTable[];

}

export interface aPTable {
  ap_no: string;
  ap_name: string;
  ap_arguments: string;
}

export interface dtrTable {
  dtr_no: any;
  dtr_id: any;
  emp_id: any;
  dtr_content: dtrJSON[];
  dtr_month_year: any;
}

export interface attendanceTable {
  attendanceDate: Date;
  attendanceHour: number;
}

export interface dtrJSON {
  date: Date;
  am_time_in: any;
  am_time_out: any;
  pm_time_in: any;
  pm_time_out: any;
  ot_time_in: any;
  ot_time_out: any;
  mhrs: number;
  remarks: string;
}

@Component({
  selector: 'app-wagespage',
  templateUrl: './wagespage.component.html',
  styleUrls: ['./wagespage.component.css']
})
export class WagespageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private datepipe: DatePipe, private noti: MatSnackBar, public lowercasepipe: LowerCasePipe, private data: DataService, private router: RouterModule) { }

  @ViewChild('content', { static: false }) es!: ElementRef;

  downloadPDF() {
    let pdf = new jspdf('l', 'px', 'a2');
    pdf.html(this.es.nativeElement,{
      callback: (pdf)=> {
        pdf.save("dtr.pdf");
      }
    });
  }  

  ngOnInit(): void {
    this.getDate();
    this.getMonsArray();
    this.pullAllEmp();
    this.buildTable();
    this.pullAllDTR();
    
  }

  ngAfterViewInit(): void {
    //this.empInfoTableDataSource.paginator = this.paginator;
    //this.empInfoTableDataSource.sort = this.sort;
  }

  //Set Date Functions

  currentDate: any;
  month: any;
  monthinNum: any;
  year: any;
  monthintText: any;
  month_year: any;
  dateIndex: any;

  //Sets Date Variables

  getDate() {

    //Sets Date
    this.currentDate = new Date(this.data.getDate());
    console.log(this.currentDate + " From DTR Page: Method getDate");
    //Sets Month and MonthYear Var
    this.monthinNum = this.data.getMonthinNum();
    this.month = this.data.getMonth();
    console.log(this.month + " From DTR Page: Method getDate ++++++++++++++++++");
    this.monthintText = this.lowercasepipe.transform(this.month);
    console.log(this.monthintText + " From DTR Page: Method getDate");
    this.year = this.data.getYear();
    this.month_year = this.monthintText + '_' + this.year;
    console.log(this.month_year + " From DTR Page: Method getDate");
    //Generate Days
    this.getDaysArray(this.monthinNum);
    //Sets Tab Index
    this.dateIndex = this.monthinNum;
  }


  ////Generate Days Array
  //dayArray: any;
  //getDaysArray(month: number) {
  //  this.dayArray = this.data.generateDaysArray(month);
  //  console.log(this.dayArray + 'From DTR Page: Method getDayArray');
  //}

  changeStartDay(event: any) {

    console.log(event.target.value);
    var day = this.datepipe.transform(event.target.value, 'd');
    console.log(day);
    this.startDay = day;
    this.getLimitedDaysArray(this.monthinNum);
  }

  changeEndDay(event: any) {

    console.log(event.target.value);
    var day = this.datepipe.transform(event.target.value, 'd');
    console.log(day);
    this.endDay = day;
    this.getLimitedDaysArray(this.monthinNum);
  }

  startDay: any = '1';
  endDay: any;

  //Generate   Days Array
  dayArray: any;
  getDaysArray(month: number) {
    this.dayArray = this.data.generateDaysArray(month);
    console.log(this.dayArray + 'From DTR Page: Method getDayArray');
    this.endDay = this.dayArray.length
  }

  //Generate Limited Days Array
  getLimitedDaysArray(month: number) {
    this.dayArray = this.data.generateLimitedDaysArray(month, this.startDay, this.endDay);
    console.log(this.dayArray + 'From DTR Page: Method getLimitedDaysArray');
    this.buildTable();

  }
  
  //Generate Months Array
  monthsArray: any;
  getMonsArray() {
    this.monthsArray = this.data.generateMonsArray();
    console.log(this.monthsArray + 'From DTR Page: Method generateMonsArray');
  }



  hightabClick(event: any) {

    //Big Buttons Sa taas
    var string = event.tab.textLabel;
    string = string.split(':');
    var month = string[0].replace(/^\s+|\s+$/g, "");
    console.log(month + 'From DTR Page: Method hightabClick');
    this.month = month;
    console.log(this.month + " From DTR Page: Method hightabClick");
    this.monthinNum = event.index
    console.log(this.monthinNum + " From DTR Page: Method hightabClick");
    this.monthintText = this.lowercasepipe.transform(this.month);
    console.log(this.monthintText + " From DTR Page: Method hightabClick");
    this.month_year = this.monthintText + '_' + this.year;
    console.log(this.month_year + " From DTR Page: Method hightabClick +++++++++++++++++++++++++");

    this.dateIndex = this.monthinNum;
    this.getDaysArray(this.monthinNum);
    this.buildTable();
    /*this.pullAllDTR();*/
  }

  empInfoTable: empTable[] = [];
  dtrInfoTable: dtrTable[] = [];
  dtrJSONTable: dtrJSON[] = [];

  empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);

  empInfo: any = {};
  dtrInfo: any = {};
  dtrJSONInfo: any = {};
  jsonData: any;

  startDate = this.datepipe.transform(new Date(2021, 6, 26), 'yyyy-MM-dd')

  pullAllDTR() {
    this.data.sendApiRequest("pullAllDTR", null).subscribe((data: any) => {
      this.dtrInfoTable = data.payload;

      for (let dtrInfoTable of this.dtrInfoTable) {
        this.jsonData = dtrInfoTable.dtr_content;
        this.dtrJSONTable = JSON.parse(this.jsonData);
        dtrInfoTable.dtr_content = this.dtrJSONTable;
      }
      console.log(this.dtrInfoTable + ' From DTR Page: Method pullAllDTR');
      /*this.appendEmp();*/
      /*this.appendEmp('2021001', this.startDate );*/
    });
  }


  attendanceTableInfo: attendanceTable[] = [];

  //COMMENTS HERE ARE SOOO LONG

  getHours(emp_id: any, date: any) {
    //console.log(emp_id);
    //console.log(date);
    for (let dtrInfoTable of this.dtrInfoTable) {
      if (dtrInfoTable.emp_id === emp_id) {
        /*console.log('Match Found')*/
        var attendanceDate: Date;
        var attendanceHour: number;

        for (let dtrContent of dtrInfoTable.dtr_content) {
          attendanceDate = dtrContent.date
          attendanceHour = dtrContent.mhrs
          if (attendanceDate === date) {
            //console.log('Match Found--------------------------------')
            //console.log(attendanceDate)
            //console.log(attendanceHour)

            if (attendanceHour < 0) {
              attendanceHour = -1
            }

            return <any>(attendanceHour)
          }

        }
        ; break
      }
    }
  }

  //consolelog(string: any) {
  //  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  //  console.log(string)
  //}


  //tabClick(event: any) {
  //  console.log(event + "From Attendance Page: tabClick")
  //  this.getDaysArray(event.index);

  //}

  ////Time Methods
  //date: any;
  //month!: number;

  ////To be Deleted
  //monthNumbertoText(monthNumber: number) {

  //}

  ////Filter 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.empInfoTableDataSource.filter = filterValue;
  }

  ////Get Current Date
  //currentDate: any;
  //getDate() {
  //  //Sets Date
  //  this.currentDate = this.data.getDate();
  //  this.month = Number( this.datepipe.transform(this.currentDate, 'MM'));
  //  //Sets Month
  //  this.month = this.month - 1;
  //  console.log(this.month + "From Attendance Page: Method getDate")
  //}


  ////These 2 are useless really, 
  ////Get First Date
  //firstDay: any;
  //getFirstDayofThisMonth() {
  //  var month
  //  this.date = new Date();
  //  month = this.date.getMonth();
  //  this.firstDay = this.data.getFirstDayofMonth(month);
  //}
  ////Get Last Date
  //lastDay: any;
  //getLastDayofThisMonth() {
  //  var month
  //  this.date = new Date();
  //  month = this.date.getMonth();
  //  this.lastDay = this.data.getLastDayofMonth(month);
  //}
  ////Generate Days Array
  //dayArray: string[] = [];

  //getDaysArray(month: number) {
  //  this.dayArray = this.data.generateDaysArray(month);
  //  console.log(this.dayArray + 'From Attendance Page: Method getDayArray');



  //TABLE BUILDER

  attendanceColumns: string[] = [];

  buildTable() {
    this.attendanceColumns = [];
    this.attendanceColumns.push("emp_name");
    this.attendanceColumns = this.attendanceColumns.concat(this.dayArray);
    this.pullAllAP();
  }


  aPInfoTable: aPTable[] = [];

  pullAllAP() {
    this.data.sendApiRequest("pullAllAP", null).subscribe((data: any) => {
      this.aPInfoTable = data.payload;
      console.log(this.aPInfoTable + ' From DTR Page: Method pullAllAP');
      for (let aPInfoTable of this.aPInfoTable) {
        this.attendanceColumns.push(aPInfoTable.ap_name);
      }
      this.pushEnding() 
    });
  }

  pushEnding() {
    this.attendanceColumns.push("cash_advance");
    this.attendanceColumns.push("total_hours");
    this.attendanceColumns.push("rate");
    this.attendanceColumns.push("total_wage");
  }

  //  //Implement Dedicated Functions
  //  this.attendanceColumns = [];

  //  //add First Columns
  //  this.attendanceColumns.push("emp_name");
  //  //add Days columns    
  //  this.attendanceColumns = this.attendanceColumns.concat(this.dayArray);
  //  //add End Columns
  //  this.attendanceColumns.push("total");
  //  //Reload Emp
  //  this.pullAllEmp();
  //  console.log(this.attendanceColumns + 'From Attendance Page: Method getDayArray');
  //}

  ////Generate Mons Array
  //monthsArray: string[] = [];

  //getMonsArray() {
  //  this.monthsArray = this.data.generateMonsArray();
  //  console.log(this.monthsArray + 'From Attendance Page: Method generateMonsArray');    
  //}

  //Pull Emp Data
  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      this.empInfoTable = data.payload;
      console.log(this.empInfoTable);
      this.empInfoTableDataSource.data = this.empInfoTable;
      console.log(this.empInfoTableDataSource + ' From Dashboard Page: Method pullAllEmp');
    });
  }


  //Calculations

  currentTotal: number = 0;

  addtoTotal(value: number) {

    if (value != value) {
      value = 0;
    }

    /*console.log(value);*/
    this.currentTotal = this.currentTotal + value;
    /*console.log(this.currentTotal);*/

  }

  //from attendance page modified to take rate

  totalHours!: number;

  getTotalHours() {
    this.totalHours = this.currentTotal;
    if (this.totalHours != this.totalHours) {
      this.totalHours = 0;
    }

    return (this.totalHours)
  }

  totalWage!: number;

  getTotalWage(rate: number) {
    this.totalWage = this.currentTotal;
    this.currentTotal = 0;
    if (this.totalWage != this.totalWage) {
      this.totalWage = 0;
    }

    this.totalWage = this.totalWage * rate;

    return (this.totalWage)
  }



  ////Summate Hour, Needs Better Implementation

  //totalHours = 0;

  ////Reads per line needs to improve further

  //addtoTotal(hour: any, id: any) {
  //  //this.totalHours = this.totalHours + hour;
  //  //console.log(this.totalHours + ' From Dashboard Page: Method addtoTotal');
  //}

  //getTotalHours(id: any) {
  //  //var total;
  //  //total = this.totalHours;
  //  //this.totalHours = 0;
  //  //return total;
  //}

  //pullAllAtt() {
  //  this.data.sendApiRequest("pullAllAtt", null).subscribe((data: any) => {
  //    this.attInfoTable = data.payload;
  //    this.attInfoTableDataSource = new MatTableDataSource(this.attInfoTable);
  //    console.log(this.attInfoTable + ' From Dashboard Page: Method pullAllAtt');
  //  });
  //}



  //notify() {
  //  this.noti.open("hello", "ok");
  //  console.log("Index Running")
  //}






}




