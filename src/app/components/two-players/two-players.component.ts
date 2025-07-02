import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-two-players',
  templateUrl: './two-players.component.html',
  styleUrls: ['./two-players.component.scss'],
  standalone: false
})
export class TwoPlayersComponent implements OnInit, OnDestroy {
  room: string | null = null
  role: string | null = null;
  constructor(private readonly socketService: SocketService) { }

  ngOnInit(): void {
    this.room = this.socketService.room;
    this.role = this.socketService.role;
  }

  ngOnDestroy(): void {
    this.socketService.leaveRoom();
  }
}
