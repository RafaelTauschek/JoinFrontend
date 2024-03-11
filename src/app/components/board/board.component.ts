import { HttpClient } from '@angular/common/http';
import { Component, OnInit, WritableSignal, effect, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Task } from '../../models/task.class';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { CdkDrag } from '@angular/cdk/drag-drop';
import { DropareaComponent } from './components/droparea/droparea.component';
import { Router, RouterOutlet } from '@angular/router';
@Component({
    selector: 'app-board',
    standalone: true,
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss',
    imports: [CommonModule, DragDropModule, CdkDrag, DropareaComponent]
})
export class BoardComponent implements OnInit {
  hasError: boolean = false;
  isLoading: boolean = false;
  public todoTasks: Task[] = [];
  public inProgressTask: Task[] = [];
  public awaitingFeedbackTask: Task[] = [];
  public doneTasks: Task[] = [];
  public data = inject(DataService);
  public http = inject(HttpClient)

  constructor() {
    // this.data.getTasks();
    // effect(() => this.filterTasks(this.data.tasksSignal()))
  }


  async ngOnInit() {

  }




  filterTasks(tasks: Task[]) {
    this.todoTasks = tasks.filter((task: Task) => task.status === 'TODO');
    this.inProgressTask = tasks.filter((task: Task) => task.status === 'PROGRESS');
    this.awaitingFeedbackTask = tasks.filter((task: Task) => task.status === 'FEEDBACK');
    this.doneTasks = tasks.filter((task: Task) => task.status === 'DONE');
    console.log('TODO', this.todoTasks);
    console.log('PROGRESS', this.inProgressTask);
    console.log('FEEDBACK', this.awaitingFeedbackTask);
    console.log('DONE', this.doneTasks);
  }
}



