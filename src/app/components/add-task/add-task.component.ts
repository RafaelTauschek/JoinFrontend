import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../models/task.class'; 

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  title: string = '';
  description: string = '';
  due_date: Date | null = null;
  prio: string = '';
  status: string = '';
  category: string = '';

  constructor(private http: HttpClient) {

  }




  
  async addTask() {
    let task = new Task({
      title: this.title,
      description: this.description,
      due_date: this.due_date,
      prio: this.prio,
      status: this.status,
      category: this.category,
    })
    try {
      let resp = await this.postTasks(task.toJSON());
      console.log(resp)
    } catch (e) {
      console.log(e)
    }
  }


  async postTasks(task: any) {
    console.log(task);
    const url = environment.baseUrl + '/tasks/';
    const body = task
    return lastValueFrom(this.http.post(url, body));
  }

  async putTask(taskId: number, task: any) {
    const url = environment.baseUrl + '/tasks/' + taskId + '/';
    const body = JSON.stringify(task)
    return lastValueFrom(this.http.put(url, body));
  }
}