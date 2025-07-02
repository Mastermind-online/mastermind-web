// socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ColorService {
    clueColor: string | null = null;
    secretCombination = [];

    constructor() {}

    setClueColor(clueColor: string) {
        this.clueColor = clueColor;
    }
}
