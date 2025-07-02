import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { COLORS } from 'src/app/constants/colors';
import { ColorService } from 'src/app/services/color.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-create-combination',
  templateUrl: './create-combination.component.html',
  styleUrls: ['./create-combination.component.scss'],
  standalone: false
})
export class CreateCombinationComponent implements OnInit {
  constructor(private readonly socketService: SocketService, private readonly router: Router, private readonly colorService: ColorService) {}

  colorPool = COLORS;
  secretCombo = [];


  ngOnInit(): void {

  }

  dropInColorPool(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.previousIndex);
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  ready() {
    this.socketService.checkRoomExists('testisa').then(exists => {
      if (exists) {
        alert('Room already exists.');
      } else {
          this.socketService.setRoom('testisa')
          this.socketService.createRoom()
          this.socketService.createCombination(this.secretCombo);
          this.colorService.secretCombination = this.secretCombo;
          this.router.navigate(['/two-players']);
        }
    });
  }
}
