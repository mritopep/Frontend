import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() predictionPercentage;
  @Input() confidencePercentage;

  constructor() { }

  ngOnInit(): void {
  }

}
