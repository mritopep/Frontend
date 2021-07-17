import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() label;
  @Input() confidence;
  conditionMap: Map<any, any>;
  descMap: Map<any, any>;

  constructor() { 
    this.conditionMap = new Map();
    this.conditionMap.set('CN', 'Cognitively Normal');     
    this.conditionMap.set('EMCI', 'Early Mild Cognitive  Impairment');
    this.conditionMap.set('MCI', 'Mild Cognitive Impairment');
    this.conditionMap.set('LMCI', 'Late Mild Cognitive  Impairment');
    this.conditionMap.set('SMC', 'Significant Memory Concern');
    this.conditionMap.set('AD', 'Alzheimers Disease');
    this.descMap = new Map();
    this.descMap.set('CN', 'Cognitively Normal');     
    this.descMap.set('EMCI', 'Early Mild Cognitive  Impairment');
    this.descMap.set('MCI', 'Mild Cognitive Impairment');
    this.descMap.set('LMCI', 'Late Mild Cognitive  Impairment');
    this.descMap.set('SMC', 'Significant Memory Concern');
    this.descMap.set('AD', 'Alzheimers Disease');
  }

  ngOnInit(): void {
  }

}
