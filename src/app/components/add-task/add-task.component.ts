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
  assignedTo: [] = []

  constructor(private http: HttpClient) {
    this.testTask()
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
      let resp = await this.postTasks(task);
      console.log(resp)
    } catch (e) {
      console.error(e)
    }
  }

  testTask() {
    console.log('Test task started');
    const url = environment.baseUrl + '/tasks/';
    const body = {
      title: "Test",
      description: "Test",
      due_date: "2024-03-27",
      prio: "L",
      status: "TODO",
    }
    try {
      let resp = lastValueFrom(this.http.post(url, body));
      console.log(resp);
    } catch (e) {
      console.error(e)
    }
  }


  async postTasks(task: any) {
    const url = environment.baseUrl + '/tasks/';
    const body = task.toJSON()
    console.log('Body',  body);
    return lastValueFrom(this.http.post(url, body));
  }

  async putTask(taskId: number, task: any) {
    const url = environment.baseUrl + '/tasks/' + taskId + '/';
    const body = JSON.stringify(task)
    return lastValueFrom(this.http.put(url, body));
  }
}