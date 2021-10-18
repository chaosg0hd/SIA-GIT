import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'application';

  constructor(public dataService : DataService) { }

  ngOnInit(): void {
    this.checkIfMobile()
    this.checkIfServerActive()

  }

  isMobile: boolean = false;

  checkIfMobile() {
    console.log(window.screen.width)
    if (window.screen.width <= 480) {
      this.isMobile = true;      
    }
    console.log(this.isMobile)
    this.dataService.setIsMobile(this.isMobile)
  }

  ipAddress: any;
  checkIfServerActive() {

    this.dataService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    });

    console.log(this.ipAddress)
    /*this.dataService.(this.isMobile)*/

  }
 
}
