import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  devs: { name: string; position: string; img: string; }[];
  constructor(private data: ContentService) {  
  }

  ngOnInit() {
    this.devs = this.data.dev;
  }

}
