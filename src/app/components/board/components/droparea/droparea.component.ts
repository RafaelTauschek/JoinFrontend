import { Component, OnInit, effect, inject } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../../../models/task.class';
import { DataService } from '../../../../services/data.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Category } from '../../../../models/category.class';
import { environment } from '../../../../../environments/environment';
import { last, lastValueFrom } from 'rxjs';



@Component({
  selector: 'app-droparea',
  standalone: true,
  imports: [DragDropModule, CommonModule],
  templateUrl: './droparea.component.html',
  styleUrl: './droparea.component.scss'
})
export class DropareaComponent implements OnInit {
  public todoTasks: Task[] = [];
  public inProgressTask: Task[] = [];
  public awaitingFeedbackTask: Task[] = [];
  public doneTasks: Task[] = [];
  public users: [] = [];
  public data = inject(DataService);
  public http = inject(HttpClient);
  public categorys: Category[] = [];
  public tasktest: Task[] = []

  constructor() {
    this.data.getTasks();
    this.data.getUsers();
    // effect(() => this.filterTasks(this.data.tasksSignal()));

  }

  ngOnInit(): void {
    this.data.getCategorys().subscribe((categorys) => {
      this.categorys = categorys;
    });

    this.data.getTasksTest().subscribe((tasks) => {
      this.filterTasks(tasks);
      console.log('Updated Tasks');
      
    })
  }



  getCategoryName(id: number) {
    let category = this.categorys.find((category: Category) => category.id === id);
    return category?.name
  }

  getCategoryColor(id: number) {
    let category = this.categorys.find((category: Category) => category.id === id);
    return category?.color
  }


  filterTasks(tasks: Task[]) {
    this.todoTasks = tasks.filter((task) => task.status === 'TODO');
    this.inProgressTask = tasks.filter((task) => task.status === 'PROGRESS');
    this.awaitingFeedbackTask = tasks.filter((task) => task.status === 'FEEDBACK');
    this.doneTasks = tasks.filter((task) => task.status === 'DONE');
  }


  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateTask(event.container.data, event.container.id)
    }
  }


  async updateTask(task: any, id: string) {
    const url = environment.baseUrl + `/tasks/${task[0].id}/`;
    const body = {
      "status": id
    }

    try {
      let resp = await lastValueFrom(this.http.patch(url, JSON.stringify(body)))
      console.log(resp);
      this.data.getTasksTest();
    } catch (e) {
      console.error(e);
    }


  }


}
