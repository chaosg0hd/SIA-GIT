import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { DatePipe, Time } from '@angular/common';
import { LowerCasePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface empTable {
  emp_id: string;
  emp_firstname: string;
  emp_lastname: string;
  emp_address: string;
  emp_datebirth: Date;
  emp_contact: string;
  emp_time_in: Time;
  emp_time_out: Time;
  emp_department: string;
  emp_is_archived: string;
  emp_sex: string;
  emp_position: string;
  emp_start_date: Date;
  emp_status: string;
  emp_last_mod_date: Date;
  emp_last_mod_by: any;
}

export interface dtrTable {
  dtr_no: any;
  dtr_id: any;
  emp_id: any;
  dtr_content: JSON;
  dtr_month_year: any;
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
  selector: 'app-dailytimerecordpage',
  templateUrl: './dailytimerecordpage.component.html',
  styleUrls: ['./dailytimerecordpage.component.css']
})
export class DailytimerecordpageComponent implements OnInit {

  empInfoTable: empTable[] = [];
  dtrInfoTable: dtrTable[] = [];
  dtrJSONTable: dtrJSON[] = [];

  empInfo: any = {};
  dtrInfo: any = {};
  dtrJSONInfo: any = {};

  constructor(private data: DataService, public datepipe: DatePipe, public lowercasepipe: LowerCasePipe) { }

  ngOnInit(): void {
    this.getDate();
    this.pullAllEmp();
    
  }

  hasDTRbool: boolean = false;

  //Methods

  //Pull Emps
  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      /*console.log(JSON.parse(data.payload));*/
      this.empInfoTable = data.payload;      
      console.log(this.empInfoTable + ' From DTR Page: Method pullAllEmp');
      this.pullAllDTR()
    });
  }

  //Pull DTR
  pullAllDTR() {
    this.data.sendApiRequest("pullAllDTR", null).subscribe((data: any) => {
      this.dtrInfoTable = data.payload;
      console.log(this.dtrInfoTable + ' From DTR Page: Method pullAllDTR');      
      this.pullDTR(this.empInfoTable[0].emp_id);
    });

  }

  //Pull DTR Contents
  jsonData: any;
  pullDTR(emp_id: string) {
    console.log(emp_id + ' From DTR Page: Method pullDTRContents');
    this.dtrJSONTable = [];
    for (let dtrInfoTable of this.dtrInfoTable) {      
      console.log(emp_id + '_' + this.month_year);
      if (dtrInfoTable.dtr_id === emp_id + '_' + this.month_year) {
        this.hasDTRbool = true;
        this.jsonData = dtrInfoTable.dtr_content;
        this.dtrJSONTable = JSON.parse(this.jsonData);
        console.log(this.dtrJSONTable + ' From DTR Page: Method pullDTRContents');
      } else {
        console.log('NO MAAATCH')
        /*this.hasDTRbool = false;*/
      }
    }

  }

  resetDTRbool() {
    this.hasDTRbool = false;
  }

  //Generate DTR
  async addemptyDTR(emp_id: any, month_year: any) {
    //DTR INFO
    this.dtrJSONTable = [];
    this.dtrInfo = {};
    this.dtrInfo.emp_id = emp_id;
    this.dtrInfo.dtr_month_year = month_year;
    this.dtrInfo.dtr_id = emp_id + '_' + month_year;
    for (let dayArray of this.dayArray) {
      this.dtrJSONInfo = {
        date: dayArray,
        am_time_in: 'null',
        am_time_out: 'null',
        pm_time_in: 'null',
        pm_time_out: 'null',
        ot_time_in: 'null',
        ot_time_out: 'null',
        mhrs: 0,
        remarks: 'none',
      };
      this.dtrJSONTable.push(this.dtrJSONInfo)
      console.log(JSON.stringify(this.dtrJSONInfo + ' From DTR Page: Method addemptyDTR'));
    }
    console.log(this.dtrJSONTable);
    this.dtrInfo.dtr_content = JSON.stringify(this.dtrJSONTable);
    console.log(this.dtrInfo + ' From DTR Page: Method addEmp');
    this.data.sendApiRequest("addDTR", this.dtrInfo).subscribe((data: any) => {
      this.ngOnInit();
    });
    
  }

  //Edit DTR
  async editDTR(dtrJSON: any, dtr_id: any) {

    this.dtrInfo.dtr_id = dtr_id;
    this.dtrInfo.dtr_content = JSON.stringify(dtrJSON)
    this.data.sendApiRequest("editDTR", this.dtrInfo).subscribe((data: any) => {
    });
  }

  //Need to ReImplement Filter 
  ////Filter 
  //applyFilter(event: Event) {
  //  const filterValue = (event.target as HTMLInputElement).value;
  //  this.empInfoTableDataSource.filter = filterValue;
  //}

  //Get Current Month
  currentDate: any;
  month: any;
  year: any;
  monthintText: any;
  month_year: any;

  getDate() {
    //Sets Date
    this.currentDate = this.data.getDate();
    //Sets Month and MonthYear Var
    this.month = new Date(this.currentDate);
    console.log(this.month + " From DTR Page: Method getDate");
    this.monthintText = this.datepipe.transform(this.month, 'MMMM');
    this.monthintText = this.lowercasepipe.transform(this.monthintText);
    console.log(this.monthintText + " From DTR Page: Method getDate");
    this.year = this.datepipe.transform(this.month, 'YYYY');
    this.month_year = this.monthintText + '_' + this.year;
    console.log(this.month_year + " From DTR Page: Method getDate");
    //Generate Days
    this.getDaysArray(Number(this.datepipe.transform(this.month, 'MM')) - 1);
  }

  dayArray: any;

  getDaysArray(month: number) {
    this.dayArray = this.data.generateDaysArray(month);
    console.log(this.dayArray + 'From DTR Page: Method getDayArray');
  }

  tabClick(event: any) {
    var string = event.tab.textLabel;
    string = string.split(':');
    var id = string[0].replace(/^\s+|\s+$/g, "");
    console.log(id + 'From DTR Page: Method tabClick');
    this.resetDTRbool();
    this.pullDTR(id);    
  }

  //OPEN DTR

  updateList(dtr_id: any, event: any, argument: string, date: any) {
    console.log(event + '+++++++++ From DTR Page: Method updateList');
    for (let dtrJSONTable of this.dtrJSONTable) {
      if (dtrJSONTable.date == date) {
        console.log('Date Matched');
        switch (argument) {
          case "am_time_in": {
            dtrJSONTable.am_time_in = event.target.value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "am_time_out": {
            dtrJSONTable.am_time_out = event.target.value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "pm_time_in": {
            dtrJSONTable.pm_time_in = event.target.value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "pm_time_out": {
            dtrJSONTable.pm_time_out = event.target.value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "ot_time_in": {
            dtrJSONTable.ot_time_in = event.target.value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "ot_time_out": {
            dtrJSONTable.ot_time_out = event.target.value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "mhrs": {
            dtrJSONTable.mhrs = event.target.value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "remarks": {
            dtrJSONTable.remarks = event.target.value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }

          default: {
            console.log(argument + ': No Valid Argumments From DTR Page: Method updateList');
            break;
          }

        }
      }
    }
    this.editDTR(this.dtrJSONTable, dtr_id);
  }


  am_time_in: any;
  am_time_out: any;
  pm_time_in: any;
  pm_time_out: any;
  ot_time_in: any;
  ot_time_out: any;

  setam_time_in(time :any) {
    this.am_time_in = time;
  }
  setam_time_out(time: any) {
    this.am_time_out = time;
  }
  setpm_time_in(time: any) {
    this.pm_time_in = time;
  }
  setpm_time_out(time: any) {
    this.pm_time_out = time;
  }
  setot_time_in(time: any) {
    this.ot_time_in = time;
  }
  setot_time_out(time: any) {
    this.ot_time_out = time;
  }

//Implement Round Up Policy Here
  gethour(time: string) {
    var hour_minute = time.split(':');
    var hour = parseInt(hour_minute[0]);
    var minute = parseInt(hour_minute[1]) / 60;

    if (minute != minute) {
      minute = 0;
    }

    hour = hour + minute;
    
    /*console.log(hour + '++++++++')*/
    return(hour);
  }

  computehrs() {
    //console.log(this.am_time_in + ':From DTR Page: Method computehrs')

    //console.log(this.am_time_in);
    //console.log(this.am_time_out+'++++++++++++++++++++++++++++++');
    var am_total = this.gethour(this.am_time_out) - this.gethour(this.am_time_in);
    this.am_time_in = 0;
    this.am_time_out = 0;
    var pm_total = this.gethour(this.pm_time_out) - this.gethour(this.pm_time_in);
    this.pm_time_in = 0;
    this.pm_time_out = 0;
    var ot_total = this.gethour(this.ot_time_out) - this.gethour(this.ot_time_in);
    this.pm_time_in = 0;
    this.pm_time_out = 0;
    

    if (am_total != am_total) {
      am_total = 0;
    }

    if (pm_total != pm_total) {
      pm_total = 0;
    }

    if (ot_total != ot_total){
      ot_total = 0;
    }
    
    var total = am_total + pm_total + ot_total;

    return (total +' hrs');
  } 

  generateDTR(emp_id: string) {
    
    this.addemptyDTR(emp_id, this.month_year);
    this.dtrJSONTable = [];
    
  }  

}
