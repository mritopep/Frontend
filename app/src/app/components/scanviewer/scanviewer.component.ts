import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scanviewer',
  templateUrl: './scanviewer.component.html',
  styleUrls: ['./scanviewer.component.css']
})
export class ScanviewerComponent implements OnInit {
  @Input() name: string;
  @Input() totalSliceNumber: number;
  @Input() imageFiles: any[] = [];
  currentSliceNumber: number = 0;
  currentImage: any;

  constructor() { }

  ngOnInit(): void {
    this.currentSliceNumber = this.totalSliceNumber / 2;
    this.currentImage = this.imageFiles[this.currentSliceNumber];
    console.log(this.currentSliceNumber);
    console.log(this.name);
    console.log(this.totalSliceNumber);
    console.log(this.imageFiles);
  }

  onSliderChange($event) {
    this.currentSliceNumber = Number($event.value);
    this.currentImage = this.imageFiles[this.currentSliceNumber];
  }



}
