import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scanviewer',
  templateUrl: './scanviewer.component.html',
  styleUrls: ['./scanviewer.component.css']
})
export class ScanviewerComponent implements OnInit {
  @Input() name: string;
  @Input() totalSliceNumber: number;
  currentSliceNumber: number = 0;
  currentImage: any;
  @Input()
  get imageFiles(): any[] {
    return this._imageFiles;
  }
  set imageFiles(imageFiles: any[]) {
    this._imageFiles = imageFiles;
  };
  private _imageFiles = [];

  constructor() { }

  ngOnInit(): void {
      this.currentSliceNumber = Math.floor(this.totalSliceNumber / 2);
      this.currentImage = this.imageFiles[this.currentSliceNumber];
  }

  onSliderChange($event) {
    this.currentSliceNumber = Number($event.value);
    this.currentImage = this.imageFiles[this.currentSliceNumber];
  }



}
