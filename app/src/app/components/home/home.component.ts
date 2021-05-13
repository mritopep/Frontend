import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CloudStorageService } from 'src/app/services/cloudstorage.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  messages: Observable<any[]>;
  currentMessage: any;
  messageSub: Subscription;

  constructor(private webSocket: WebsocketService, private cloudStorage: CloudStorageService) { }

  ngOnInit(): void {
    // this.messageSub = this.webSocket.listen("messages").subscribe((data) => {
    //   this.currentMessage = data;
    //   console.log(data);
    // });
    // this.messages = this.webSocket.getAll("messages");
  }

  ngOnDestroy() {
    // this.messageSub.unsubscribe();
  }

  newMessage() {
    // this.webSocket.emit("messages", "hello NY");
    // this.cloudStorage.getFileList("");
    this.cloudStorage.downloadFile("https://www.dropbox.com/s/u82jeoc2571yp3m/pet.zip?dl=0");
  }
}
