// socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket: Socket;
    room: string | null = null;
    role: string | null = null;
    private readonly SERVER_URL = environment.backendUrl; // backend URL

    constructor() {
        this.socket = io(this.SERVER_URL);

        this.socket.on('connect', () => {
            console.info('Connected to socket server:', this.socket.id);
        });

        this.socket.on('disconnect', () => {
            console.info('Disconnected from socket server');
        });
    }

    checkRoomExists(roomName: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        this.socket.emit('checkRoom', roomName, (response: { exists: boolean }) => {
            resolve(response.exists);
        });
    });
    }

    setRoom(room: string) {
        this.room = room;
    }

    createRoom(room: string, secretCombination: string[]): void {
        this.role = 'codeMaster';
        this.socket.emit('createRoom', room, secretCombination);
    }
    
    joinRoom(): void {
        this.role = 'codeBreaker';
        this.socket.emit('joinRoom', this.room);
    }

    leaveRoom(): void {
        this.socket.emit('leaveRoom', this.room);
        this.room = null;
        this.role = null;
    }

    dropColor(room: string, color: string, container: string) {
        console.log('socket service: ', color);
        this.socket.emit('dropColor', { room, color, container });
    }

    onDroppedColor(): Observable<{ color: string, container: string }> {
        return new Observable((observer) => {
            this.socket.on('receivedDroppedColor', (data) => {
                observer.next(data);
            });
        });
    }

    onSecretCombinationReceived(): Observable<string[]> {
        return new Observable((observer) => {
            this.socket.on('secretCombination', (combination) => {
                observer.next(combination);
            });
        });
    }

    sendClues(attemptNumber: number, clues: any) {
        this.socket.emit('sendClues', {attemptNumber, clues});
    }

    onReceivedClues(): Observable<any> {
        return new Observable((observer) => {
            this.socket.on('receivedClues', (data) => {
                observer.next(data);
            });
        });
    }

    // Listen to event
    onUserConnected(): Observable<string> {
        return new Observable((observer) => {
            this.socket.on('userConnected', (data: string) => {
                observer.next(data);
            });
        });
    }
}
