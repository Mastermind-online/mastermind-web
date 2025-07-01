import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss'],
  standalone: false
})
export class SelectRoleComponent {
  roomId = new FormControl();

  constructor(private readonly router: Router) { }

  joinRoom() {
    console.log(this.roomId.value)
  }

  createRoom() {
    this.router.navigate(['/create-combination'])
  }
}
