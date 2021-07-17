import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnInit {

  textIndicator: string;
  indicatorColor: string;
  @Input() confidence;
  colorMap: Map<any, any>;
  @Input()
  get label(): any {
    return this._label;
  }
  set label(label: any) {
    this._label = label;
    this.textIndicator = label;
    this.indicatorColor = this.colorMap.get(label);
  };
  private _label;

  constructor() {
    this.colorMap = new Map();
    this.colorMap.set('CN', '#60D490');
    this.colorMap.set('EMCI', '#D4C860');
    this.colorMap.set('MCI', '#F78248');
    this.colorMap.set('LMCI', '#ED601A');
    this.colorMap.set('SMC', '#F25559');
    this.colorMap.set('AD', '#EF292E');
  }

  ngOnInit(): void {
  }

}
