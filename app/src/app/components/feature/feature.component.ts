import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {
  mriImage: boolean;
  petImage: boolean;

  constructor(private imageService : ImageService) { }

  ngOnInit(): void {
  }

  getMri(){
    this.imageService.getMriImages().subscribe((data) => {
      if(data.toString() === "MRI_RECIVED"){
        console.log(data);
        this.mriImage = true;
      }
    });
  }

  getPet(){
    this.imageService.getPetImages().subscribe((data) => {
      if(data.toString() === "PET_RECIVED"){
        console.log(data);
        this.petImage = true;
      }
    });
  }

}
