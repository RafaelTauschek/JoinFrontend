import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Task } from '../../models/task.class';
import { TaskInterface } from '../../interfaces/task.interface';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
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

  constructor(private data: DataService) {
    this.data.getTasksTest().subscribe((tasks) => {
      this.tasks = tasks;
      this.filterTasks(tasks);
    });
    console.log(this.tasks);
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
    const formatedDeadline = new Date(deadline).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
    this.upcomingDeadline = formatedDeadline;
  }

}
