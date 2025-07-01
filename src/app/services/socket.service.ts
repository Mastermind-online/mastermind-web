// socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private readonly SERVER_URL = 'http://localhost:3001'; // backend URL

  constructor() {
    this.socket = io(this.SERVER_URL);

     this.socket.on('connect', () => {
      console.log('Connected to socket server:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });
  }

  joinRoom(room: string): void {
  this.socket.emit('joinRoom', room);
}

leaveRoom(room: string): void {
  this.socket.emit('leaveRoom', room);
}

dropColor(room: string, color: string, container: string) {
    console.log('socket service: ', color)
    this.socket.emit('dropColor', { room, color, container })
}

onDroppedColor(): Observable<{color: string, container: string}> {
    return new Observable((observer) => {
        this.socket.on('receivedDroppedColor', (data) => {
            console.log('color dropped: ', data.color)
            console.log('container: ', data.container)
            observer.next(data)
        })
    })

}

  // Listen to event
  onUserConnected(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('userConnected', (data: string) => {
        console.log('user connected: ', data)
        observer.next(data);
      });
    });
  }
}
