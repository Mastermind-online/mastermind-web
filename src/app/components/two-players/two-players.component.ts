import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two-players',
  templateUrl: './two-players.component.html',
  styleUrls: ['./two-players.component.scss'],
  standalone: false
})
export class TwoPlayersComponent {
  roomId = new FormControl();

  constructor(private readonly router: Router) { }

  joinRoom() {
    console.log(this.roomId.value)
  }

  createRoom() {
    this.router.navigate(['/one-player'], { fragment: 'mismuelas' })
  }
}
