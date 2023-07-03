import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.component.html',
  styleUrls: ['./attempt.component.scss']
})
export class AttemptComponent implements OnInit {
  @Input() attemptNumber!: number;

  colorArrays: any[] = [];
  clues: Array<string> = [];

  ngOnInit(): void {
    this.createColorArrays();
  }

  private createColorArrays() {
    const prefix = 'color' + this.attemptNumber;

    for (let i = 0; i < 6; i++) {
      const colorArrayName = prefix + i;
      this.colorArrays.push( {name: colorArrayName, value: ['transparent']});
    }
  }

  drop(event: CdkDragDrop<string[]>) {
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

  checkCombination(secretCombination: string[]) {
    const myCombination = this.colorArrays.map((colorArray) => colorArray.value[0]);

    myCombination.forEach(color => {
      if (secretCombination.includes(color)) {
        if (myCombination.indexOf(color) === secretCombination.indexOf(color)) {
          this.clues.unshift('black');
        } else {
          this.clues.push('white');
        }
      }
    });
  }
}
