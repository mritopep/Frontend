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

  constructor(private webSocket: WebsocketService, private cloudStorage: CloudStorageService, private imageService: ImageService) {
    this.options = new Options();
  }

  ngOnInit(): void {
    this.messageSub = this.webSocket.listen("Messages").subscribe((msg) => {

      if (msg.id == "PET_ZIP_UPLOAD" && msg.data.uploaded == true) {
        this.petUploaded = true;
        this.petURL = msg.data.url;
      }

      if (msg.id == "MRI_IMG_UPLOAD" && msg.data.uploaded == true) {
        this.mriImageURL = msg.data.url;
        this.mriTotalSliceNumber = msg.data.total_slice_number;
        this.mriImagePath="../../../assets/mri_img/";
        this.imageService.getMriImages(this.mriImageURL).subscribe((data) => {
          if (data.toString() === "MRI_RECIVED") {
            this.mriImage = true;
            console.log("Mri image upload")
          }
        });
      }

      if (msg.id == "PET_IMG_UPLOAD" && msg.data.uploaded == true) {
        this.petImageURL = msg.data.url;
        this.petTotalSliceNumber = msg.data.total_slice_number;
        this.petImagePath="../../../assets/pet_img/";
        this.imageService.getPetImages(this.petImageURL).subscribe((data) => {
          if (data.toString() === "PET_RECIVED") {
            console.log("Pet image upload");
            this.petImage = true;
          }
        });
      }

      if (msg.id == "PROCESS_STATUS") {
        this.processStatus = msg.data;
      }

    });
    // this.messages = this.webSocket.getAll("messages");
  }

  ngOnDestroy() {
    this.messageSub.unsubscribe();
  }

  onFileUploaded($event: any) {
    this.file = $event[0];
  }

  onSelection($event) {
    this.options = $event;
    console.log(this.options);
    this.createMessage("OPTION", this.options);
  }

  createMessage(id, data) {
    const msg = new Message;
    msg.id = id;
    msg.data = data;
    this.webSocket.emit("Messages", msg);
  }

}
