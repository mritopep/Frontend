import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-img-base64',
  templateUrl: './img-base64.component.html',
  styleUrls: ['./img-base64.component.css']
})
export class ImgBase64Component implements OnInit {
  @Input() base64Image: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
  }

}