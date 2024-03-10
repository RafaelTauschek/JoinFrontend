import { Component, effect, inject } from '@angular/core';
import { CdkDragDrop, DragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../../../models/task.class';
import { DataService } from '../../../../services/data.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-droparea',
  standalone: true,
  imports: [DragDropModule, CommonModule],
  templateUrl: './droparea.component.html',
  styleUrl: './droparea.component.scss'
})
export class DropareaComponent {
  public todoTasks: Task[] = [];
  public inProgressTask: Task[] = [];
  public awaitingFeedbackTask: Task[] = [];
  public doneTasks: Task[] = [];
  public data = inject(DataService);
  public http = inject(HttpClient);

  constructor(private cdr: ChangeDetectorRef) {
    this.data.getTasks();
    effect(() => this.filterTasks(this.data.tasksSignal()))
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

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    }
  }

  updateTask(task: Task) {
    const url = environment.baseUrl + '/tasks/' + task.id + '/';
    const body = task.toJSON();
    return lastValueFrom(this.http.patch(url, body))
  }

}
