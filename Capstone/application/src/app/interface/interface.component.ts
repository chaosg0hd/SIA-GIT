import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.checkIfMobile()
  }

  isMobile!: boolean

  checkIfMobile() {
    this.isMobile = this.dataService.getIsMobile()
    console.log(this.isMobile)


  }


}
