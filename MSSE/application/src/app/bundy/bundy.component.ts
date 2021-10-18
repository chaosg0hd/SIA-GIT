import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bundy',
  templateUrl: './bundy.component.html',
  styleUrls: ['./bundy.component.css']
})
export class BundyComponent implements OnInit {

  constructor(public datepipe: DatePipe,) { }

  ngOnInit(): void {
    this.getTime()
  }

  timeinhours!: any
  timeinminutes!: any
  timeinseconds!: any
  timeinmeri!: any
  day!: any
  date!: any

  async getTime() {
    while (true) {
      this.date = new Date
      this.day = this.datepipe.transform(this.date, "fullDate")
      this.timeinhours = this.datepipe.transform(this.date, "hh")
      this.timeinminutes = this.datepipe.transform(this.date, "mm")
      this.timeinseconds = this.datepipe.transform(this.date, "ss")
      this.timeinmeri = this.datepipe.transform(this.date, "a")
      console.log(this.day, this.timeinhours, this.timeinminutes, this.timeinseconds)
      await this.delay(1000)
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
