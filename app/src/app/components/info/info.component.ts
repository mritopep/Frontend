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
    this.descMap.set('CN', `It shows no signs of depression, mild cognitive impairment, or dementia.`);     
    this.descMap.set('EMCI', `It's the stage between age-related cognitive decline and Alzheimer's disease or other types of dementia.`);
    this.descMap.set('MCI', `It's an early stage of memory loss or other cognitive ability loss such as language or visual/spatial perception.`);
    this.descMap.set('LMCI', `It's described as performance below the normative mean of cognitive tests and has highest risk of transformation to Alzheimer's disease.`);
    this.descMap.set('SMC', `It's objective evidence of cognitive decline although the exact rate of complaints and their diagnostic value is uncertain.`);
    this.descMap.set('AD', `It's a progressive neurologic disorder that causes the brain to shrink (atrophy) and brain cells to die.`);
  }

  ngOnInit(): void {
  }

}
