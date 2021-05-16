import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {
  Features: any;
  Feature: any;
  Featureshow: boolean = false;

  constructor(private data: ContentService) { 
    this.Features = this.data.Features;
    console.log(this.Features);
    this.Feature = this.Features[0];
  }

  ngOnInit(): void {
  }

  load(Feature){
    this.Feature = Feature;
  }

}
