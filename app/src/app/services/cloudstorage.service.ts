import { Injectable } from '@angular/core';
import { Dropbox, Error, files, sharing } from 'dropbox';

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {
  readonly accessToken: string = 'qgBOG8SoX40AAAAAAAAAAS1vYK2gErIvVRe_1oAThUqey142pf2pYzMmPYnRZuFW';
  dbx: any;
  files: any;
  downloadedFile: any;
  images: any


  constructor() {
    this.dbx = new Dropbox({ accessToken: this.accessToken });
  }

  uploadFile(fileName: string, fileContent: any) {
    this.dbx.filesUpload({ path: `/${fileName}`, fileContent })
      .then((response: any) => {
        console.log(response);
      })
      .catch((uploadErr: Error<files.UploadError>) => {
        console.log(uploadErr);
      });
  }

  getFileList(path: string) {
    this.dbx.filesListFolder({ path: path })
      .then((response: any) => {
        this.files = response;
        console.log(response);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  downloadFile(sharedLink: string) {
    this.dbx.sharingGetSharedLinkFile({ url: sharedLink })
      .then((data: any) => {
        this.downloadedFile = data;
        console.log("File Recived");
        console.log(data);
      })
      .catch((err: Error<sharing.GetSharedLinkFileError>) => {
        console.log(err);
      });
  }
  
}
