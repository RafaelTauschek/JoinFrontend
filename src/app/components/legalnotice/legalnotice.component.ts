import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-legalnotice',
  standalone: true,
  imports: [],
  templateUrl: './legalnotice.component.html',
  styleUrl: './legalnotice.component.scss'
})
export class LegalnoticeComponent {
  @Output() componentSelected = new EventEmitter<string>();


  selectComponent(component: string): void {
    this.componentSelected.emit(component)
  }
}
