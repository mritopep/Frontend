import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { WebsocketService } from 'src/app/services/websocket.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CloudStorageService } from 'src/app/services/cloudstorage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() file: any;
  @Output() deleteFile = new EventEmitter<any>();
  @Input() petURL: any;
  denoise_msg_shown: boolean;
  skull_strip_msg_shown: boolean;
  bais_correction_msg_shown: boolean;

  @Input()
  get petUploaded(): any {
    return this._petUploaded;
  }
  set petUploaded(petUploaded: any) {
    this._petUploaded = petUploaded;
  };
  private _petUploaded;

  @Input()
  get processStatus(): any {
    return this._processStatus;
  }
  set processStatus(processStatus: any) {
    this._processStatus = processStatus;
    if(processStatus.denoise && !this.denoise_msg_shown){
      this.openSnackBar("Denoising Completed 👍", "OK",30);
      this.denoise_msg_shown = true;
    }
    if(processStatus.skull_strip && !this.skull_strip_msg_shown){
      this.openSnackBar("Skull Stripping Completed 👍", "OK",30);
      this.skull_strip_msg_shown = true;
    }
    if(processStatus.bais_correction && !this.bais_correction_msg_shown){
      this.openSnackBar("Bais Correction Completed 👍", "OK",30)
      this.bais_correction_msg_shown = true;
    }
  };
  private _processStatus = {};

  mriUploaded: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;

  constructor(private webSocket: WebsocketService, private _snackBar: MatSnackBar, private cloudStorage: CloudStorageService) { 
    this.denoise_msg_shown = false;
    this.skull_strip_msg_shown = false;
    this.bais_correction_msg_shown = false;
  }

  ngOnInit(): void {
  }

  next() {
    if (this.file) {
      this.openSnackBar("Process Started 👍", "OK");
      this.cloudStorage.uploadFile("mri.zip", this.file).then((fileUploaded: boolean) => {
        if (fileUploaded) {
          console.log("Mri zip upload");
          this.openSnackBar("Zip Uploaded 👍", "OK");
          this.createMessage("MRI_ZIP_UPLOAD", { uploaded: true });
          this.mriUploaded = true;
        }
      }).catch((err) => {
        console.log(err);
      });
    } else {
      this.openSnackBar("Upload a File First 😅", "OK");
    }
  }

  createMessage(id, data) {
    const msg = new Message;
    msg.id = id;
    msg.data = data;
    this.webSocket.emit("Messages", msg);
  }

  download() {
    this.openSnackBar("Download Started ⚡", "OK");
    console.log(this.petURL);
    window.open(this.petURL);
    this.deleteFile.emit(true);
    this.createMessage("DELETE_STATUS", { delete: true });
    this._petUploaded = false;
    this.mriUploaded = false;
    this._processStatus = {};
    this.openSnackBar("Files Deleted 🔥", "OK");
  }

  openSnackBar(message: string, action: string, duration?: number) {
    let currentDuration = this.durationInSeconds;
    if(duration){
      currentDuration = duration;
    }
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: currentDuration * 1000,
    });
  }
}
