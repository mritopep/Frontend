import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private socket: Socket) {
  }

  listen(eventName: string) {
    return this.socket.fromEvent<any>(eventName);
  }

  getAll(eventName: string){
    return this.socket.fromEvent<any[]>(eventName);
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  private genrateId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

}
