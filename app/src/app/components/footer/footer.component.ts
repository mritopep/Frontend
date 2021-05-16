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
  @Input() petUploaded: any;
  @Input()
  get processStatus(): any {
    return this._processStatus;
  }
  set processStatus(processStatus: any) {
    this._processStatus = processStatus;
  };
  private _processStatus = {};
  mriUploaded: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;

  constructor(private webSocket: WebsocketService, private _snackBar: MatSnackBar,private cloudStorage: CloudStorageService) { }

  ngOnInit(): void {
  }

  next() {
    this.openSnackBar("Process Started 👍", "OK")
    this.cloudStorage.uploadFile("mri.zip", this.file).then((fileUploaded: boolean) => {
      if (fileUploaded) {
        console.log("Mri zip upload");
        this.createMessage("MRI_ZIP_UPLOAD", { uploaded: true });
        this.mriUploaded = true;
      }
    }).catch((err) => {
      console.log(err);
    });

    // console.log("Mri zip upload");
    // this.createMessage("MRI_ZIP_UPLOAD", { uploaded: true });
    // this.mriUploaded = true;
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
    this.petUploaded = false;
    this.mriUploaded = false;
    this._processStatus = {};
    this.openSnackBar("Files Deleted 🔥", "OK");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
