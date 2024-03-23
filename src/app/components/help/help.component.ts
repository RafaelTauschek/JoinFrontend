import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {
  @Output() componentSelected = new EventEmitter<string>();


  selectComponent(component: string): void {
    this.componentSelected.emit(component)
  }
}
