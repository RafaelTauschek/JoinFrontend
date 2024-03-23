import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BoardComponent } from '../board/board.component';
import { HeaderComponent } from '../header/header.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AddTaskComponent } from '../add-task/add-task.component';
import { SummaryComponent } from '../summary/summary.component';
import { HelpComponent } from '../help/help.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, 
    RouterOutlet, SidebarComponent, 
    BoardComponent, HeaderComponent, 
    ContactsComponent, MatSidenavModule,
    AddTaskComponent, SummaryComponent, HelpComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  selectedComponent: string = 'summary';

  constructor() { }

  onComponentSelect(component: string): void {
    this.selectedComponent = component
  }

}
