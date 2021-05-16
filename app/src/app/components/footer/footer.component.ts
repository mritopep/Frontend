import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { CloudStorageService } from 'src/app/services/cloudstorage.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() file: any;
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

  constructor(private webSocket: WebsocketService, private cloudStorage: CloudStorageService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  next() {
    this.openSnackBar("Process Started 👍", "OK")

    // this.cloudStorage.uploadFile("mri.zip", this.file).then((fileUploaded: boolean) => {
    //   if (fileUploaded) {
    //     console.log("Mri zip upload");
    //     this.createMessage("MRI_ZIP_UPLOAD", { uploaded: true });
    //     this.mriUploaded = true;
    //   }
    // }).catch((err) => {
    //   console.log(err);
    // });

    console.log("Mri zip upload");
    this.createMessage("MRI_ZIP_UPLOAD", { uploaded: true });
    this.mriUploaded = true;
  }

  createMessage(id, data) {
    const msg = new Message;
    msg.id = id;
    msg.data = data;
    this.webSocket.emit("Messages", msg);
  }

  download() {
    this.openSnackBar("Download Started ⚡", "OK")
    console.log(this.petURL);
    this.cloudStorage.downloadZipFile(this.petURL).then((fileDownloaded: boolean) => {
      if (fileDownloaded) {
        this.createMessage("DELETE_STATUS", { delete: true });
        this.openSnackBar("Files Deleted 🔥", "OK")
        // this.delete();
        console.log("User downloaded zip");
        this.petUploaded = false;
        this.mriUploaded = false;
        this._processStatus = {};
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  openSnackBar(message: string, action: string) {
    console.log("hello");
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
