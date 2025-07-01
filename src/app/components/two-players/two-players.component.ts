import { Component } from '@angular/core';

@Component({
  selector: 'app-two-players',
  templateUrl: './two-players.component.html',
  styleUrls: ['./two-players.component.scss'],
  standalone: false
})
export class TwoPlayersComponent {
  room = 'jeje';

  constructor() { }

}
