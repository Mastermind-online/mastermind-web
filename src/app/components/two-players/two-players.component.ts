import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-two-players',
  templateUrl: './two-players.component.html',
  styleUrls: ['./two-players.component.scss'],
  standalone: false
})
export class TwoPlayersComponent {
  roomId = new FormControl();

  constructor() { }

  joinRoom() {
    console.log(this.roomId.value)
  }

  createRoom() {
    
  }
}
