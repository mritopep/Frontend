import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnInit {
  textIndicator: string;
  indicatorColor: string;
  @Input()
  get percentage(): any {
    return this._percentage;
  }
  set percentage(percentage: any) {
    this._percentage = Math.ceil(percentage);
    if(this._percentage >= 66){
      this.textIndicator = "HIGH";
      this.indicatorColor = "#f25559";
    } else if(this._percentage >= 34){
      this.textIndicator = "MED";
      this.indicatorColor = "#f78248";
    } else {
      this.textIndicator = "LOW";
      this.indicatorColor = "#60d490";
    }
  };
  private _percentage;

  

  constructor() { }

  ngOnInit(): void {
  }

}
