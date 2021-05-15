import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Options } from 'src/app/models/options.model';
@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  @Output()
  optionsSelected = new EventEmitter<any>();


  process_options: Options;

  constructor() { 
    this.process_options = new Options;
    this.process_options.denoise = false;
    this.process_options.skull_strip = false;
    this.process_options.bias_correction = false;
  }

  ngOnInit(): void {
  }

  setValue($event){
    if($event.source.id === "denoise"){
      this.process_options.denoise = $event.checked;
    }
    if($event.source.id === "skull_strip"){
      this.process_options.skull_strip = $event.checked;
    }
    if($event.source.id === "bais_correction"){
      this.process_options.bias_correction = $event.checked;
    }
    this.optionsSelected.emit(this.process_options);
  }


}
