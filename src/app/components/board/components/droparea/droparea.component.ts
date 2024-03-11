import { Component, effect, inject } from '@angular/core';
import { CdkDragDrop, DragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../../../models/task.class';
import { DataService } from '../../../../services/data.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { TaskInterface } from '../../../../interfaces/task.interface';

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
  public doneTasks: Task[] = []
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
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      console.log(event.container.data);
      this.updateTask(event.container.data, event.container.id)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }


  updateTask(task: any, id: string) {
    console.log('Task recieved: ', task);   //Empty array with object inside?
    console.log(Array.isArray(task)) // true
    console.log(task[0])   //undefined
    
    
    



    // const url = environment.baseUrl + '/tasks/' + '' + '/';
    // console.log(url);
    // const updatedTask = new Task({
    //   title: task[0].title,
    //   description: task[0].description,
    //   due_date: task[0].due_date,
    //   prio: task[0].prio,
    //   status: id,
    //   category: task[0].category,
    //   assigned_to: task[0].assigned_to,
    // })
    // console.log('updated Task: ', updatedTask);
    

    // try {
    //   let resp = lastValueFrom(this.http.patch(url, updatedTask.toJSON()))
    //   console.log(resp);
    // } catch (e) {
    //   console.error(e);  
    // }
  }
}
