import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { COLORS } from 'src/app/constants/colors';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-code-master',
  templateUrl: './code-master.component.html',
  styleUrls: ['./code-master.component.scss'],
  standalone: false
})
export class CodeMasterComponent implements OnInit {
  constructor(private readonly socketService: SocketService, private readonly router: Router) {}

  attempts: {color: string, container: string}[] = []
  colorPool = COLORS;
  secretCombo = [];


  ngOnInit(): void {
    this.subscribeToColorChanges();
  }

  private subscribeToColorChanges() {
    this.socketService.onDroppedColor().subscribe((data) => {
      this.attempts.push(data)
      console.log('entro: ', data)
    })
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
    this.router.navigate(['/one-player'])
  }
}
