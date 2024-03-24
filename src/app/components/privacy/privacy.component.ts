import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {
  @Output() componentSelected = new EventEmitter<string>();


  selectComponent(component: string): void {
    this.componentSelected.emit(component)
  }
}
