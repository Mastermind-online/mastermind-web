import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.component.html',
  styleUrls: ['./attempt.component.scss']
})
export class AttemptComponent implements OnInit {
  @Input() attemptNumber: number = 0;

  clues: Array<string> = [];

  constructor() {
    
   }

  ngOnInit(): void {
    console.log(this.attemptNumber)
    const arrayName = 'myColor'
    for (let i = this.attemptNumber; i < this.attemptNumber + 6; i++){
      arrayName.concat(i.toString())
    }
  }

}
