import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pays } from '../../../../models/Pays';

@Component({
  selector: 'app-pays-card',
  standalone: true,
  imports: [],
  templateUrl: './pays-card.component.html',
  styleUrl: './pays-card.component.css'
})
export class PaysCardComponent {
  @Input({required: true}) pays!: Pays;
  @Output() onEditListener = new EventEmitter();
  @Output() onDeleteListener = new EventEmitter();
  @Output() onClickListener = new EventEmitter();

  constructor(){
    this.pays = new Pays("", "");
  }

  onEditButtonClicked(){
    this.onEditListener.emit();
  }

  onDeleteButtonClicked(){
    this.onDeleteListener.emit();
  }
  onClickPays(id: number){
    this.onClickListener.emit(id);
  }
}
