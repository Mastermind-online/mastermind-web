import { Component } from '@angular/core';

@Component({
  selector: 'app-rules-modal',
  templateUrl: './rules-modal.component.html',
  styleUrls: ['./rules-modal.component.scss'],
  standalone: false
})
export class RulesModalComponent {
  showRules = false;

  openRules() {
    this.showRules = true;
  }

  closeRules() {
    this.showRules = false;
  }

}
