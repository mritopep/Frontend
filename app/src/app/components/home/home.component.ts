import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { Options } from 'src/app/models/options.model';
import { CloudStorageService } from 'src/app/services/cloudstorage.service';
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
  mriImageFiles: any[] = [];
  petImageFiles: any[] = [];
  class: any;
  confidence: any;
  prediction: boolean;

  constructor(private webSocket: WebsocketService, private cloudStorage: CloudStorageService) {
    this.options = new Options();
    this.petUploaded = false;

    this.mriImage = false;
    this.petImage = false;

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
    
    this.prediction = false;
    this.class = "";
    this.confidence = 1;
  }

  ngOnInit(): void {
    this.mriImageSub = this.webSocket.listen("MRI").subscribe((data) => {
      const msg = this.extractData(data);
      console.log(`MRI IMAGE SLICE ${msg.slice_no} RECIVED`)
      this.mriImageFiles[Number(msg.slice_no)] = msg.data;
    });

    this.petImageSub = this.webSocket.listen("PET").subscribe((data) => {
      const msg = this.extractData(data);
      console.log(`PET IMAGE SLICE ${msg.slice_no} RECIVED`)
      this.petImageFiles[Number(msg.slice_no)] = msg.data;
    });
    this.messageSub = this.webSocket.listen("Messages").subscribe((data) => {
      const msg = this.extractData(data);

      if (msg.id == "PET_ZIP_UPLOAD" && msg.data.uploaded == true) {
        this.cloudStorage.downloadZipFile(msg.data.url).then((windowURL) => {
          if (windowURL) {
            console.log(windowURL);
            this.petURL = windowURL;
            this.petUploaded = true;
            console.log(this.petUploaded);
          }
        }).catch((err) => {
          console.log(err);
        });
      }

      if (msg.id == "MRI_IMG_UPLOAD" && msg.data.uploaded == true) {
        console.log("MRI_RECIVED");
        this.mriTotalSliceNumber = msg.data.total_slice_number - 1;
        this.mriImage = true;
      }

      if (msg.id == "PET_IMG_UPLOAD" && msg.data.uploaded == true) {
        console.log("PET_RECIVED");
        this.petTotalSliceNumber = msg.data.total_slice_number - 1;
        this.petImage = true;
      }

      if (msg.id == "PROCESS_STATUS") {
        this.processStatus = msg.data;
      }

      if (msg.id == "PREDICTION") {
        console.log("PREDICTION_RECIVED");
        this.prediction = true;
        this.class = msg.data.class;
        this.confidence = msg.data.confidence;
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
    this.createMessage("START", {start_server: true});
    this.file = $event;
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

  deleteFiles($event) {
    if ($event) {
      this.mriImageFiles = [];
      this.petImageFiles = [];
      this.file = undefined;
      this.petUploaded = false;
      this.mriImage = false;
      this.petImage = false;
      this.prediction = false;
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
  }

}
