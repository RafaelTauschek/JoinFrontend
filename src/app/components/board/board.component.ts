import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  tasks: any = [];
  filteredTasks!: any;
  error: string = '';

  constructor(private http: HttpClient) { }


  async ngOnInit() {
    try {
      this.tasks = await this.loadTasks();
      this.categorizeTasks(this.tasks)
    } catch (e) {
      this.error = 'Fehler beim Laden!';
    }
  }


  async loadTasks() {
    const url = environment.baseUrl + '/tasks/';
    return lastValueFrom(this.http.get(url));
  }

  categorizeTasks(tasks: any) {
    const categorizedTasks = new Map();
    tasks.forEach((task: any) => {
        const status = task['status'];
        if (categorizedTasks.has(status)) {
            categorizedTasks.get(status).push(task);
        } else {
            categorizedTasks.set(status, [task]);
        }
    });
    this.filteredTasks = categorizedTasks
}










}



