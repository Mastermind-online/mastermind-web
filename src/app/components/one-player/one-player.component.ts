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

  myColors = ['transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent']
  myColor1 = ['transparent']
  myColor2 = ['transparent']
  myColor3 = ['transparent']
  myColor4 = ['transparent']
  myColor5 = ['transparent']
  myColor6 = ['transparent']
  myColor7 = ['transparent']
  myColor8 = ['transparent']
  myColor9 = ['transparent']
  myColor10 = ['transparent']
  myColor11 = ['transparent']
  myColor12 = ['transparent']
  myColor13 = ['transparent']
  myColor14 = ['transparent']
  myColor15 = ['transparent']
  myColor16 = ['transparent']
  myColor17 = ['transparent']
  myColor18 = ['transparent']
  myColor19 = ['transparent']
  myColor20 = ['transparent']
  myColor21 = ['transparent']
  myColor22 = ['transparent']
  myColor23 = ['transparent']
  myColor24 = ['transparent']
  myColor25 = ['transparent']
  myColor26 = ['transparent']
  myColor27 = ['transparent']
  myColor28 = ['transparent']
  myColor29 = ['transparent']
  myColor30 = ['transparent']
  myColor31 = ['transparent']
  myColor32 = ['transparent']
  myColor33 = ['transparent']
  myColor34 = ['transparent']
  myColor35 = ['transparent']
  myColor36 = ['transparent']

  constructor() {}

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

  drop(event: CdkDragDrop<string[]>) {
    debugger
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.previousIndex);
      } else {
        event.container.data[0] = event.item.data
        event.container.data.pop()
        copyArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
  }

  checkCombination() {
    const myCombination = this.myColor1.concat(this.myColor2, this.myColor3, this.myColor4, this.myColor5, this.myColor6);

    myCombination.forEach(color => {
      if (this.secretCombination.includes(color)) {
        if (myCombination.indexOf(color) === this.secretCombination.indexOf(color)) {
          this.clues.unshift('black')
        } else {
          this.clues.push('white')
        }
      }
    })


    this.attemptNumber++

    console.log('my combination: ', myCombination)
    console.log('clues: ', this.clues)
  }
}
