import { Component, OnInit } from '@angular/core';
import { DatePipe, Time } from '@angular/common';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(public datepipe: DatePipe,) { }

  ngOnInit(): void {
    this.getTime()
  }

  timeinminutes!: any;
  timeinseconds!: any;
  date!: any
  async getTime() {
    while (true) {
      this.date = new Date
      this.timeinminutes = this.datepipe.transform(new Date(), "mm")
      this.timeinminutes = 60 - this.timeinminutes
      this.timeinseconds = this.datepipe.transform(new Date(), "ss")
      this.timeinseconds = 60 - this.timeinseconds
      console.log(this.timeinminutes, this.timeinseconds)
      await this.delay(1000)
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
