import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../models/task.class';
import { Category } from '../../models/category.class';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {
  title: string = '';
  description: string = '';
  due_date: Date | null = null;
  status: string = '';
  category: string = '';
  assignedTo: [] = [];
  prio: string = '';
  activeImage: string = '';
  categorys: Category[] = [];
  users: User[] = []

  constructor(private http: HttpClient, private data: DataService) { }

  ngOnInit(): void {
    this.data.getCategorys().subscribe((category) => {
      this.categorys = category;
    });
    setTimeout(() => {
      console.log(this.categorys);
    }, 500);

    this.data.getUsers().subscribe((users) => {
      this.users = users;
      console.log(this.users);
      
    })

  }


  async addTask() {
    if (this.status == '') {
      this.status = 'TODO';
    }
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




  async postTasks(task: any) {
    const url = environment.baseUrl + '/tasks/';
    const body = task.toJSON()
    console.log('Body', body);
    return lastValueFrom(this.http.post(url, body));
  }

  async putTask(taskId: number, task: any) {
    const url = environment.baseUrl + '/tasks/' + taskId + '/';
    const body = JSON.stringify(task)
    return lastValueFrom(this.http.put(url, body));
  }


  selectPriority(prio: string) {
    if (this.prio == prio) {
      this.prio = ''
    } else {
      this.prio = prio;
    }
  }




}