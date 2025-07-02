import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { every } from 'rxjs';
import { COMBINATION_NUMBER } from 'src/app/constants/combination-number';
import { ColorService } from 'src/app/services/color.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-master-attempt',
  templateUrl: './master-attempt.component.html',
  styleUrls: ['./master-attempt.component.scss'],
  standalone: false
})
export class MasterAttemptComponent implements OnInit {
  @Input() attemptNumber!: number;
  @Input() room!: string | null;
  @Output() emitEnableCheck: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emitCorrect: EventEmitter<boolean> = new EventEmitter<boolean>();

  colorArrays: any[] = [];
  clues: Array<any> = [{ id: 1, backgroundColor: 'transparent' },
    { id: 2, backgroundColor: 'transparent' },
    { id: 3, backgroundColor: 'transparent' },
    { id: 4, backgroundColor: 'transparent' },
    { id: 5, backgroundColor: 'transparent' }];
  isCombinationCorrect: boolean = false;

  divs = [
    
    // Add as many divs as you need
  ];

  constructor(private readonly socketService: SocketService, private readonly colorService: ColorService) {}

  ngOnInit(): void {
    this.createColorArrays();
  }

  private createColorArrays() {
    const prefix = 'color' + this.attemptNumber;

    for (let i = 0; i < COMBINATION_NUMBER; i++) {
      const colorArrayName = prefix + i;
      this.colorArrays.push( {name: colorArrayName, value: ['Transparent']});
    }
  }

  setColor(index: number) {
    this.clues[index].backgroundColor = this.colorService.clueColor;
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('color: ', event.item.data)
    console.log('containerID: ', event.container.id)
    if (this.room) {
      this.socketService.dropColor('mismuelas', event.item.data, event.container.id)
    }
    
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
    
    this.isCombinationReady();
  }

  private isCombinationReady() {
    const myCombination = this.colorArrays.map((colorArray) => colorArray.value[0]);
    const combinationStatus = new Set(myCombination).size === myCombination.length;
    
    this.emitEnableCheck.emit(combinationStatus);
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

    if (this.clues.length === COMBINATION_NUMBER && this.clues.every(clue => clue === 'black')) {
      this.isCombinationCorrect = true;
      this.emitCorrect.emit(true);
    }
  }
}
