import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly URL = 'http://localhost:4100';

  constructor(private http: HttpClient) { }

  getMriImages(sharedLink: string) {
    return this.http.post(this.URL + '/mri',{sharedLink});
  }

  getPetImages(sharedLink: string) {
    return this.http.post(this.URL + '/pet',{sharedLink});
  }
}
