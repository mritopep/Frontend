import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { Options } from 'src/app/models/options.model';
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
  sample: string;

  constructor(private webSocket: WebsocketService) {
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
        this.petUploaded = true;
        this.petURL = msg.data.url;
      }

      if (msg.id == "MRI_IMG_UPLOAD" && msg.data.uploaded == true) {
        console.log("MRI_RECIVED");
        this.mriTotalSliceNumber = msg.data.total_slice_number;
        console.log(this.mriTotalSliceNumber);
        this.mriImage = true;
      }

      if (msg.id == "PET_IMG_UPLOAD" && msg.data.uploaded == true) {
        console.log("PET_RECIVED");
        this.petTotalSliceNumber = msg.data.total_slice_number;
        console.log(this.petTotalSliceNumber);
        this.petImage = true;
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
