import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ATTEMPTS } from 'src/app/constants/attempts';
import { COLORS } from 'src/app/constants/colors';

@Component({
  selector: 'app-one-player',
  templateUrl: './one-player.component.html',
  styleUrls: ['./one-player.component.scss']
})
export class OnePlayerComponent implements OnInit {
  attemptNumber: number = 1;

  secretCombination: string[] = [];
  colors = ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'white', 'transparent'];
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

  constructor() {}

  ngOnInit(): void {
    this.createSecretCombination();
  }

  private createSecretCombination() {
    for (let index = 0; this.secretCombination.length < 6; index++) {
      const randomItem = this.colors[Math.floor(Math.random() * 10)];

      if (!this.secretCombination.includes(randomItem)) {
        this.secretCombination.push(randomItem);
      }
    }

    console.log(this.secretCombination)
  }

  drop(event: CdkDragDrop<string[]>) {
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


    console.log(myCombination)
    console.log(this.clues)
  }
}
