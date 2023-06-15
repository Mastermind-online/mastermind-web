import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, Output } from '@angular/core';
import { COLORS } from 'src/app/constants/colors';
import { DROP_LIST_CONNECTED } from 'src/app/constants/drop-list-connected-to';

@Component({
  selector: 'app-one-player',
  templateUrl: './one-player.component.html',
  styleUrls: ['./one-player.component.scss']
})
export class OnePlayerComponent implements OnInit {
  attemptNumber: number = 1;
  dropListConnectedTo = DROP_LIST_CONNECTED;
  secretCombination: string[] = [];
  colorPool = COLORS;
  clues: Array<string> = [];

  ngOnInit(): void {
    this.createSecretCombination();
  }

  private createSecretCombination() {
    for (let index = 0; this.secretCombination.length < 6; index++) {
      const randomItem = this.colorPool[Math.floor(Math.random() * 10)];

      if (!this.secretCombination.includes(randomItem)) {
        this.secretCombination.push(randomItem);
      }
    }

    console.log('secret combination: ', this.secretCombination)
  }

  dropInColorPool(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.previousIndex);
  }
}
