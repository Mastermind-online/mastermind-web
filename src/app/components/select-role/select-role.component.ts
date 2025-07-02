import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss'],
  standalone: false
})
export class SelectRoleComponent {
  roomId = new FormControl();

  constructor(private readonly socketService: SocketService, private readonly router: Router) { }

  joinRoom() {
    console.log(this.roomId.value)
    const roomIdValue = this.roomId.value;
    // Usage before navigating
    this.socketService.checkRoomExists(roomIdValue).then(exists => {
      if (exists) {
        console.log('exists')
          this.socketService.setRoom(roomIdValue)
          this.socketService.joinRoom();
          this.router.navigate(['/two-players']);
        } else {
            alert('Room does not exist.');
        }
    });
  }

  createRoom() {
    this.router.navigate(['/create-combination'])
  }
}
