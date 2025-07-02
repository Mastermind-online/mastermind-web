import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { COLORS } from 'src/app/constants/colors';
import { DROP_LIST_CONNECTED } from 'src/app/constants/drop-list-connected-to';
import { AttemptComponent } from '../attempt/attempt.component';
import { COMBINATION_NUMBER } from 'src/app/constants/combination-number';

@Component({
  selector: 'app-code-breaker',
  templateUrl: './code-breaker.component.html',
  styleUrls: ['./code-breaker.component.scss'],
  standalone: false
})
export class CodeBreakerComponent {
  attemptNumber: number = 1;
  dropListConnectedTo = DROP_LIST_CONNECTED;
  secretCombination: string[] = [];
  isCombinationReady = false;
  colorPool = COLORS;
  clues: Array<string> = [];
  isCombinationCorrect: boolean = false;
  
  @Input() room!: string | null;
  @ViewChildren(AttemptComponent) attemptComponents: QueryList<AttemptComponent>;

  constructor() {}

  ngOnInit(): void {
    this.createSecretCombination();
  }

  private createSecretCombination() {
    for (let index = 0; this.secretCombination.length < COMBINATION_NUMBER; index++) {
      const randomItem = this.colorPool[Math.floor(Math.random() * this.colorPool.length)];

      if (!this.secretCombination.includes(randomItem)) {
        this.secretCombination.push(randomItem);
      }
    }

    console.info('secret combination: ', this.secretCombination);
  }

  dropInColorPool(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.previousIndex);
  }

  handleButtonEnable(event: boolean) {
    this.isCombinationReady = event;
  }

  checkAttempt() {
    const index = this.attemptNumber - 1;
    const attemptToCheck = this.attemptComponents.toArray()[index];

    attemptToCheck.checkCombination(this.secretCombination);
    this.attemptNumber++;
    this.dropListConnectedTo.splice(0, 6);
    this.isCombinationReady = false;
  }

  handleCorrectCombination(event: boolean) {
    this.isCombinationCorrect = event;
  }
}
