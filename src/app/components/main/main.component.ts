import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  tasks: any = [];
  error: string = '';

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    try {
      this.tasks = await this.loadTasks();
      console.log(this.tasks);
    } catch (e) {
      this.error = 'Fehler beim Laden!';
    }
  }

  async loadTasks() {
    const url = environment.baseUrl + '/tasks/';
    return lastValueFrom(this.http.get(url))
  }
}
