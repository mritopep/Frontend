import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { Options } from 'src/app/models/options.model';
import { CloudStorageService } from 'src/app/services/cloudstorage.service';
import { ImageService } from 'src/app/services/image.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  messages: Observable<any[]>;
  messageSub: Subscription;
  mriImageSub: Subscription;
  petImageSub: Subscription;
  options: Options;
  file: File;
  petUploaded: boolean;
  petURL: any;
  mriImageURL: any;
  mriTotalSliceNumber: any;
  mriImage: boolean;
  petImageURL: any;
  petTotalSliceNumber: any;
  petImage: boolean;
  processStatus: any;
  mriImagePath: string;
  petImagePath: string;
  sample: string;

  constructor(private webSocket: WebsocketService, private cloudStorage: CloudStorageService, private imageService: ImageService) {
    this.options = new Options();
    this.petUploaded = false;
    this.mriImage = false;
    this.petImage = false;
    this.mriImagePath = "../../../assets/mri_img/";
    this.petImagePath = "../../../assets/pet_img/";
    this.processStatus = {
      denoise: false,
      skull_strip: false,
      bais_correction: false,
      upload_start: false,
      upload_end: false,
      preprocess_start: false,
      preprocess_end: false,
      generate_start: false,
      generate_end: false,
      saving_start: false,
      saving_end: false
    };
  }

  ngOnInit(): void {
    this.messageSub = this.webSocket.listen("Messages").subscribe((data) => {
      const msg = this.extractData(data);

      if (msg.id == "PET_ZIP_UPLOAD" && msg.data.uploaded == true) {
        this.petUploaded = true;
        this.petURL = msg.data.url;
      }

      if (msg.id == "MRI_IMG_UPLOAD" && msg.data.uploaded == true) {
        this.mriImageURL = msg.data.url;
        this.mriTotalSliceNumber = msg.data.total_slice_number;
        console.log(this.mriImageURL);
        console.log(this.mriTotalSliceNumber);
        this.imageService.getMriImages(this.mriImageURL).subscribe((data) => {
          if (data.toString() === "MRI_RECIVED") {
            this.mriImage = true;
            console.log("MRI_RECIVED");
          }
        });
      }

      if (msg.id == "PET_IMG_UPLOAD" && msg.data.uploaded == true) {
        this.petImageURL = msg.data.url;
        this.petTotalSliceNumber = msg.data.total_slice_number;
        console.log(this.petImageURL);
        console.log(this.petTotalSliceNumber);
        this.imageService.getPetImages(this.petImageURL).subscribe((data) => {
          if (data.toString() === "PET_RECIVED") {
            this.petImage = true;
            console.log("PET_RECIVED");
          }
        });
      }

      if (msg.id == "PROCESS_STATUS") {
        this.processStatus = msg.data;
      }

    });    
    // this.messages = this.webSocket.getAll("messages");
  }

  private extractData(res: any) {
    let body = JSON.parse(res);
    return body || [];
  }

  ngOnDestroy() {
    this.messageSub.unsubscribe();
  }

  onFileUploaded($event: any) {
    this.file = $event[0];
  }

  onSelection($event) {
    this.options = $event;
    this.createMessage("OPTION", this.options);
  }

  createMessage(id, data) {
    const msg = new Message;
    msg.id = id;
    msg.data = data;
    this.webSocket.emit("Messages", msg);
  }

}
