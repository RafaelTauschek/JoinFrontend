import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Task } from '../../models/task.class';
import { TaskInterface } from '../../interfaces/task.interface';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  public tasks: Task[] = []
  public todoTasks: Task[] = [];
  public inProgressTask: Task[] = [];
  public awaitingFeedbackTask: Task[] = [];
  public doneTasks: Task[] = [];
  public urgentTasks: Task[] = []
  public upcomingDeadline: string = ''
  public greeting: string = '';
  public error: string = '';
  public userid: number | null = null;

  @Output() componentSelected = new EventEmitter<string>();



  constructor(private data: DataService) {
    this.data.getTasksTest().subscribe((tasks) => {
      this.tasks = tasks;
      this.filterTasks(tasks);
    });
    this.greetUser();
    this.data.currentUser$.subscribe((user) => {
      this.userid = user;
      console.log(user); 
    })
  }

  selectComponent(component: string): void {
    this.componentSelected.emit(component)
  }

  greetUser() {
    const date = new Date().getHours();
    if (date < 10) {
      this.greeting = 'Good morning,';
    } else if (date < 14) {
      this.greeting = 'Good day,';
    } else if (date < 17) {
      this.greeting = 'Good afternoon,';
    } else {
      this.greeting = 'Good evening,';
    }
  }


  filterTasks(tasks: Task[]) {
    this.todoTasks = tasks.filter((task) => task.status === 'TODO');
    this.inProgressTask = tasks.filter((task) => task.status === 'PROGRESS');
    this.awaitingFeedbackTask = tasks.filter((task) => task.status === 'FEEDBACK');
    this.doneTasks = tasks.filter((task) => task.status === 'DONE');
    this.urgentTasks = tasks.filter((task) => task.prio === 'U');
    this.getDeadlines(tasks);
  }


  getDeadlines(tasks: Task[]) {
    const parseDate = (task: TaskInterface): Date => new Date(task.due_date);
    const sortedTasks: Task[] = tasks.sort((a, b) => parseDate(a).getTime() - parseDate(b).getTime());
    const nextDeadlineTask: Task | undefined = sortedTasks[0];
    if (nextDeadlineTask) {
      this.formatDeadline(nextDeadlineTask.due_date);
    } else {
      console.log('No tasks found');
    }
  }

  formatDeadline(deadline: string) {
    if (!this.validateDeadline(deadline)) {
      this.error = '(Your last deadline is expired!)'
    }
    const formatedDeadline = new Date(deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    this.upcomingDeadline = formatedDeadline;
  }

  validateDeadline(deadline: string) {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    if (deadlineDate < currentDate) {
      return false;
    } else {
      return true;
    }
  }

  todoImages: string[] = ['../../../assets/img/icon_pencil.svg', '../../../assets/img/whitePencil.svg'];
  currentTodoImage: string = this.todoImages[0];
  doneImages: string[] = ['../../../assets/img/icon_ok.svg', '../../../assets/img/whiteOk.svg'];
  currentDoneImage: string = this.doneImages[0];
  changeImage(index: number, type: string) {
    switch (type) {
      case 'done':
        this.currentDoneImage = this.doneImages[index];
        break;
      case 'todo':
        this.currentTodoImage = this.todoImages[index];
        break;
      default:
        break;
    }
  }




}
