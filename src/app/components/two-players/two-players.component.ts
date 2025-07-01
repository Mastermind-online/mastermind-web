import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-two-players',
  templateUrl: './two-players.component.html',
  styleUrls: ['./two-players.component.scss'],
  standalone: false
})
export class TwoPlayersComponent implements OnInit, OnDestroy {
  room = 'jeje';

  constructor(private readonly socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.joinRoom(this.room);

  }

  ngOnDestroy(): void {
    this.socketService.leaveRoom(this.room);
  }
}
