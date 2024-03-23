import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() componentSelected = new EventEmitter<string>();
  menuOpend: boolean = false;

  selectComponent(component: string): void {
    this.componentSelected.emit(component)
  }

  logout() {
    console.log('Logout called');
  }

  openMenu() {
    this.menuOpend = !this.menuOpend;
  }




}
