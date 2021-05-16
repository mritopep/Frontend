import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scanviewer',
  templateUrl: './scanviewer.component.html',
  styleUrls: ['./scanviewer.component.css']
})
export class ScanviewerComponent implements OnInit {
  @Input() name: string;
  @Input() totalSliceNumber: number;
  @Input() imageFiles: any;
  currentSliceNumber: number;
  currentImage: any;

  constructor() { }

  ngOnInit(): void {
    this.currentSliceNumber = this.totalSliceNumber/2;
    console.log(this.currentSliceNumber);
    console.log(this.name);
    console.log(this.totalSliceNumber);
  }

  onSliderChange($event){
    const index = Number($event.value);
    console.log(index);
    this.currentImage = this.imageFiles[index];
  }



}
