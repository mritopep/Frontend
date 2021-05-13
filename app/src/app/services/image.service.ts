import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly URL = '/api';

  constructor(private http: HttpClient) { }

  getMriImages() {
    return this.http.get(this.URL + '/mri');
  }

  getPetImages() {
    return this.http.get(this.URL + '/pet');
  }
}
