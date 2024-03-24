import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Task } from '../models/task.class';
import { Contact } from '../models/contact.class';
import { Subtask } from '../models/subtask.calss';
import { Category } from '../models/category.class';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { TaskInterface } from '../interfaces/task.interface';
import { ContactInterface } from '../interfaces/contact.interface';
import { SubtaskInterface } from '../interfaces/subtask.interface';
import { CategoryInterface } from '../interfaces/category.interface';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  http = inject(HttpClient);
  public tasksSignal: WritableSignal<Task[]> = signal<Task[]>([]);
  public contactsSignal: WritableSignal<Contact[]> = signal<Contact[]>([]);
  public subtasksSignal: WritableSignal<Subtask[]> = signal<Subtask[]>([]);
  public categorySignal: WritableSignal<Category[]> = signal<Category[]>([]);
  public users: Object = {}
  private selectedContactSubject: BehaviorSubject<Contact | null> = new BehaviorSubject<Contact | null>(null);
  selectedContact$: Observable<Contact | null> = this.selectedContactSubject.asObservable();

  async getTasks() {
    const url = environment.baseUrl + '/tasks/';
    try {
      const resp = await lastValueFrom(this.http.get(url)) as Array<TaskInterface>;
      const tasks = resp.map((taskData: TaskInterface) => new Task(taskData));
      this.tasksSignal.set(tasks);
      console.log(tasks)
    } catch (e) {
      console.error(e)
    }
  }

  selectContact(contact: Contact) {
    this.selectedContactSubject.next(contact);
  }



  getContacts(): Observable<Contact[]> {
    const url = environment.baseUrl + '/contacts/';
    return this.http.get<Contact[]>(url);
  }


  async getSubtasks() {
    const url = environment.baseUrl + '/subtasks/';
    try {
      const resp = await lastValueFrom(this.http.get(url)) as Array<SubtaskInterface>;
      const subtasks = resp.map((subtaskData: SubtaskInterface) => new Subtask(subtaskData));
      this.subtasksSignal.set(subtasks)
    } catch(e) {
      console.error(e);
    }
  }

  getCategorys(): Observable<Category[]> {
    const url = environment.baseUrl + '/categorys/';
    return this.http.get<Category[]>(url)
  }


  getUsers(): Observable<User[]> {
    const url = environment.baseUrl + '/users/';
    return this.http.get<User[]>(url)
  }


  getTasksTest(): Observable<Task[]> {
    const url = environment.baseUrl + '/tasks/';
    return this.http.get<Task[]>(url)
  }

}
