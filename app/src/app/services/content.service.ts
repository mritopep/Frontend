import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  public Features: any = [
    {
      name: "1. Fluid & Interactive Design",
      content: "UI designed keeping user in mind",
      icon: "design.png",
    },
    {
      name: "2. Notification to User During the Process",
      content: "Keeping User Entertained Throughout Process with Informative Notification",
      icon: "part.png"
    }
  ]


  public dev = [
    {
      name: "Antony J Malakkaran",
      position: "Developer",
      img: "dev0.png"
    },
    {
      name: "George Prince",
      position: "Developer",
      img: "dev1.png"
    },
    {
      name: "Ashia",
      position: "Developer",
      img: "dev2.png"
    },
    {
      name: "Harishma",
      position: "Developer",
      img: "dev3.png"
    }
  ]

  constructor() { }
}