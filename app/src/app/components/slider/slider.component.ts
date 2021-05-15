import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() name: string;
  @Input() totalSliceNumber: number;
  @Input() path: string;
  currentSliceNumber: number;
  currentImagePath: string;

  
  constructor() { 
  }

  ngOnInit(): void {
    this.currentSliceNumber = this.totalSliceNumber/2;
    // console.log(this.currentSliceNumber);
    // console.log(this.name);
    // console.log(this.path);
    // console.log(this.totalSliceNumber);
  }

  onSliderChange($event){
    const img = `${$event.value}.jpeg`;
    this.currentImagePath = this.path+img;
    console.log(this.currentImagePath);
  }

}
