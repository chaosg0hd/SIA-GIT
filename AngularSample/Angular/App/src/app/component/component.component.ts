import { Component, OnInit } from '@angular/core';

export interface sentence{
  firstword: string;
  secondword: string;
}

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.insertToSentence()
    this.writeToConsole()
    this.blinkingColor()
    this.goLow()   

  }

  delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
  }

  boxes: any = [

    { name: "box" },
    { name: "box" },
    { name: "box" },
    { name: "box" },
    { name: "box" },

  ]

  sentence: sentence[] = []

  pContent: string = "<p>HEY IM A VARIABLE<p>"

  divHeight:string = "100px"
  divWidth: string = "100px"

  divColor: string = ""

  divTop: number = 100
  divRight: string = "500px"

  divGetTop() {
    return this.divTop +"px"
  }

  async goLow() {
    while (true) {
      this.getRandomRight()
      await this.delay(100)
      console.log(this.divTop)
      this.divTop = this.divTop + 10

      if (this.divTop == 500) {
        this.divTop = 0
      }

    }    
  }

  getRandomRight() {
    /*console.log(Math.random() * 1000 )*/
    return Math.random()*100 + "px"
  }

  async blinkingColor() {

    while (true) {      
      this.toGreen()
      console.log(this.divColor)
      await this.delay(1000)
      this.toRed()
      console.log(this.divColor)
      await this.delay(1000)
    }
    
  }

  getColor() {
    return this.divColor
  }
  
  toGreen() {
    this.divColor = "green"
  }

  toRed() {
    this.divColor = "red"
  }

  insertToSentence() {
    this.sentence = [{firstword: "firstword", secondword: "secondword"}]
  }

  writeToConsole() {
    console.log("Hello World")
    console.table(this.sentence)
  }

}
