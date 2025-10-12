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

  colors: any[] = [];
  clues: Array<any> = [{ id: 1, backgroundColor: 'transparent' },
    { id: 2, backgroundColor: 'transparent' },
    { id: 3, backgroundColor: 'transparent' },
    { id: 4, backgroundColor: 'transparent' },
    { id: 5, backgroundColor: 'transparent' }];
  isCombinationCorrect: boolean = false;

  constructor(private readonly socketService: SocketService, private readonly colorService: ColorService) {}

  ngOnInit(): void {
    this.createColorArrays();
    this.subscribeToColorChanges();
  }

  private createColorArrays() {
    const prefix = 'color' + this.attemptNumber;

    for (let i = 0; i < COMBINATION_NUMBER; i++) {
      const colorContainerName = prefix + i;
      this.colors.push( {container: colorContainerName, brackgroundColor: 'Transparent'});
    }
  }

   private subscribeToColorChanges() {
    this.socketService.onDroppedColor().subscribe((data) => {
      this.colors.forEach((color) => {
        console.log('color: ', color);
        if (color.container === data.container) {
          console.log('entro');
          color.backgroundColor = data.color;
        }
      });
      // console.log('entro: ', data)
    });
  }

  setColor(index: number) {
    this.clues[index].backgroundColor = this.colorService.clueColor;
  }

  sendClues() {
    const mappedClues = this.clues.map((clue) => clue.backgroundColor);
    this.socketService.sendClues(this.attemptNumber, mappedClues);
  }
}
