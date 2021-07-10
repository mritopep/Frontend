import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnInit {
  text_indicator: string;
  indicatorClass: string;
  @Input()
  get percentage(): any {
    return this._percentage;
  }
  set percentage(percentage: any) {
    this._percentage = Math.ceil(percentage);
    if(percentage >= 66){
      this.text_indicator = "HIGH";
      this.indicatorClass = "high";
    } else if(percentage >= 34){
      this.text_indicator = "MED";
      this.indicatorClass = "med";
    } else {
      this.text_indicator = "LOW";
      this.indicatorClass = "low";
    }
  };
  private _percentage;

  

  constructor() { }

  ngOnInit(): void {
  }

}
