import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  @Output() filesUploaded = new EventEmitter<any>();
  file: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.file = undefined;
  }

  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }


  fileBrowseHandler(files: any) {
    this.prepareFilesList(files);
  }


  deleteFile() {
    this.file = undefined;
    this.filesUploaded.emit(this.file);
  }


  uploadFilesSimulator() {
    setTimeout(() => {
      const progressInterval = setInterval(() => {
        if (this.file.progress === 100) {
          clearInterval(progressInterval);
        } else {
          this.file.progress += 5;
        }
      }, 100);
    }, 1000);
  }


  prepareFilesList(files: any) {
    if (this.supportFile(files[0])) {
      this.file = files[0];
      this.file.progress = 0;
      this.uploadFilesSimulator();
      this.filesUploaded.emit(this.file);
      console.log(this.file);
    } else {
      this.openSnackBar("Please Upload nii file 😁", "OK");
    }
  }

  formatBytes(bytes: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

  supportFile(file: any) {
    if (file != undefined) {
      const name = file.name.split(".");
      const ext = name[name.length - 1];
      if (ext == 'nii') {
        return true;
      }
    }
    return false;
  }


}
