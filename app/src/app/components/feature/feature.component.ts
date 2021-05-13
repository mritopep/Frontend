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
    this.imageService.getMriImages("https://www.dropbox.com/s/qljrnbm9n1ji0h9/mri_img.zip?dl=0").subscribe((data) => {
      if(data.toString() === "MRI_RECIVED"){
        console.log(data);
        this.mriImage = true;
      }
    });
  }

  getPet(){
    this.imageService.getPetImages("https://www.dropbox.com/s/pwzknjvrvf3hb3w/pet_img.zip?dl=0").subscribe((data) => {
      if(data.toString() === "PET_RECIVED"){
        console.log(data);
        this.petImage = true;
      }
    });
  }

}
