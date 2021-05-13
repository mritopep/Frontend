import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { CloudStorageService } from 'src/app/services/cloudstorage.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  messages: Observable<any[]>;
  currentMessage: any;
  messageSub: Subscription;

  constructor(private webSocket: WebsocketService, private cloudStorage: CloudStorageService) { }

  ngOnInit(): void {
    this.messageSub = this.webSocket.listen("Messages").subscribe((data) => {
      this.currentMessage = data;
      console.log(data);
    });
    this.messages = this.webSocket.getAll("Messages");
  }

  ngOnDestroy() {
    this.messageSub.unsubscribe();
  }

  createMessage(id,data){
    const msg = new Message;
    msg.id = id;
    msg.data = data;
    this.webSocket.emit("Messages", msg);
  }

  sentMessage() {
    this.createMessage("MRI_UPLOAD",{
      uploaded : true
    });
  }

  getFile(){
    this.cloudStorage.getFileList("");
    this.cloudStorage.downloadFile("https://www.dropbox.com/s/u82jeoc2571yp3m/pet.zip?dl=0");
  }

}
