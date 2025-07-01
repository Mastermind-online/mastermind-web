import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { every } from 'rxjs';
import { COLORS } from 'src/app/constants/colors';
import { COMBINATION_NUMBER } from 'src/app/constants/combination-number';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-code-master',
  templateUrl: './code-master.component.html',
  styleUrls: ['./code-master.component.scss'],
  standalone: false
})
export class CodeMasterComponent implements OnInit {
  constructor(private readonly socketService: SocketService) {}

  attempts: {color: string, container: string}[] = []
  room = 'mismuelas'
  colorPool = COLORS;
  secretCombo = ['Transparent', 'Transparent', 'Transparent', 'Transparent', 'Transparent']

  ngOnInit(): void {
    this.subscribeToColorChanges();
    this.joinRoom();
  }

  private subscribeToColorChanges() {
    this.socketService.onDroppedColor().subscribe((data) => {
      this.attempts.push(data)
      console.log('entro: ', data)
    })
  }

  private joinRoom(): void {
    if (this.room.trim()) {
      this.socketService.joinRoom(this.room);
    }
  }

  dropInColorPool(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.previousIndex);
  }

  dropInSecretCombo(event: any) {
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.previousIndex);
    } else {
      event.container.data[0] = event.item.data;
      event.container.data.pop();
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

  }
}
