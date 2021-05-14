import { Injectable } from '@angular/core';
import { Dropbox, Error, files, sharing } from 'dropbox';
import * as JSZip from 'jszip';

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {
  readonly accessToken: string = 'qgBOG8SoX40AAAAAAAAAAS1vYK2gErIvVRe_1oAThUqey142pf2pYzMmPYnRZuFW';
  dbx: any;
  files: any;
  downloadedFile: any;
  fileBlob: Blob;


  constructor() {
    this.dbx = new Dropbox({ accessToken: this.accessToken });
  }

  uploadFile(fileName: string, file: File) {
    const jszip = new JSZip();
    this.changeFile(file).then((data: ArrayBuffer) => {
      jszip.file(file.name, data);
      jszip.generateAsync({ type: 'blob' }).then((content) => {
        console.log(content);
        this.dbx.filesUpload({ path: `/${fileName}`, contents: this.blobToFile(content,fileName) })
          .then((response: any) => {
            console.log(response);
            console.log("File Uploaded");
          })
          .catch((uploadErr: Error<files.UploadError>) => {
            console.log(uploadErr);
          });
      });
    });
  }

  public blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return <File>theBlob;
}

  changeFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
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

  downloadZipFile(sharedLink: string) {
    this.dbx.sharingGetSharedLinkFile({ url: sharedLink })
      .then((data: any) => {
        const blob = new Blob([data.result.fileBlob], {
          type: 'application/zip'
        });
        const url = window.URL.createObjectURL(blob);
        console.log(url);
        window.open(url);
      })
      .catch((err: Error<sharing.GetSharedLinkFileError>) => {
        console.log(err);
      });
  }

}
