import { Component, OnInit, effect, inject } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../../../models/task.class';
import { DataService } from '../../../../services/data.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Category } from '../../../../models/category.class';
import { environment } from '../../../../../environments/environment';
import { last, lastValueFrom } from 'rxjs';
import { Subtask } from '../../../../models/subtask.calss';
import { User } from '../../../../models/user.class';
import { TaskcardComponent } from '../taskcard/taskcard.component';



@Component({
  selector: 'app-droparea',
  standalone: true,
  imports: [DragDropModule, CommonModule, TaskcardComponent],
  templateUrl: './droparea.component.html',
  styleUrl: './droparea.component.scss'
})
export class DropareaComponent implements OnInit {
  public todoTasks: Task[] = [];
  public inProgressTask: Task[] = [];
  public awaitingFeedbackTask: Task[] = [];
  public doneTasks: Task[] = [];
  public users: User[] = [];
  public data = inject(DataService);
  public http = inject(HttpClient);
  public categorys: Category[] = [];
  public tasktest: Task[] = []
  public subtasks: Subtask[] = [];

  constructor() {
    this.data.getTasks();
    this.data.getUsers();
  }

  ngOnInit(): void {
    this.data.getCategorys().subscribe((categorys) => {
      this.categorys = categorys;
    });

    this.data.getTasksTest().subscribe((tasks) => {
      this.filterTasks(tasks);
    })

    this.data.getUsers().subscribe((users) => {
      this.users = users
    })

  }



  getDoneSubtasks(subtasks: Subtask[]) {
    let doneCount = 0
    subtasks.forEach((subtask) => {
      if (subtask.status == "C") {
        doneCount++;
      }
    });
    if (doneCount == 0) {
      return "0"
    } else {
      return doneCount;
    }
  }

  countSubtaskProperty(subtasks: Subtask[]) {
    let checkedCount = 0;
    let uncheckedCount = 0;
    subtasks.forEach((subtask) => {
      if (subtask.status == "C") {
        checkedCount++
      } else {
        uncheckedCount++
      }
    });
    return { 'checked': checkedCount, 'unchecked': uncheckedCount }
  }


  calculateProgressBar(subtasks: Subtask[]) {
    let propertys = this.countSubtaskProperty(subtasks);
    let percent = Math.floor((propertys.checked / subtasks.length) * 100);
    return percent
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





  async drop(event: CdkDragDrop<Task[]>) {
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
      await this.updateTask(event.container.data, event.container.id)
    }
  }


  async updateTask(task: any, id: string) {
    const url = environment.baseUrl + `/tasks/${task[0].id}/`;
    const body = {
      "status": id
    }

    try {
      let resp = await lastValueFrom(this.http.patch(url, body));
      console.log(resp);
      this.data.getTasksTest();
    } catch (e) {
      console.error(e);
    }
  }

  getPrioImage(prio: string) {
    switch (prio) {
      case ('M'):
        return '../../../assets/img/prio_medium_color.png'
      case ('U'):
        return '../../../assets/img/prio_urgent_color.png'
      default:
        return '../../../assets/img/prio_low_color.png'
    }
  }

  displayTaskCard: boolean = false;
  selectedTask!: Task;

  openTask(task: Task) {
    this.selectedTask = task;
    this.displayTaskCard = true;
  }







}
