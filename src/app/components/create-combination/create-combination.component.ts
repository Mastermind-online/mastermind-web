import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { COLORS } from 'src/app/constants/colors';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-create-combination',
  templateUrl: './create-combination.component.html',
  styleUrls: ['./create-combination.component.scss'],
  standalone: false
})
export class CreateCombinationComponent implements OnInit {
  constructor(private readonly router: Router) {}

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
    this.router.navigate(['/two-players'])
  }
}
