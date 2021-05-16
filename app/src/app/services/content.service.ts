import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  public features: any = [
    {
      name: "Feature1",
      content: "Content1",
      icon: "la la-sort-amount-asc",
    },
    {
      name: "Feature1",
      content: "Content1",
      icon: "la la-sort-amount-asc"
    },
    {
      name: "Feature1",
      content: "Content1",
      icon: "la la-sort-amount-asc"
    },
    {
      name: "Feature1",
      content: "Content1",
      icon: "la la-sort-amount-asc"
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
