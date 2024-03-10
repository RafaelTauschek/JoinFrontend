import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() componentSelected = new EventEmitter<string>();

  selectComponent(component: string): void {
    this.componentSelected.emit(component)
  }

}
