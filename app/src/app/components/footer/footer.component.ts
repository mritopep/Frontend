import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { CloudStorageService } from 'src/app/services/cloudstorage.service';
import { ImageService } from 'src/app/services/image.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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

  constructor(private webSocket: WebsocketService, private cloudStorage: CloudStorageService, private imageService: ImageService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  next() {
    this.openSnackBar("Process Started", "OK")
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
    this.openSnackBar("Download Started", "OK")
    console.log(this.petURL);
    this.cloudStorage.downloadZipFile(this.petURL).then((fileDownloaded: boolean) => {
      if (fileDownloaded) {
        this.createMessage("DELETE_STATUS", { delete: true });
        // this.delete();
        console.log("User downloaded zip");
        this.petUploaded = false;
        this.mriUploaded = false;
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  delete() {
    this.openSnackBar("Files Deleted", "OK")
    this.imageService.deleteContent().subscribe((data) => {
      console.log(data);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
