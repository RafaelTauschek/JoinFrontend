import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { filter, lastValueFrom } from 'rxjs';
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
  users: User[] = [];
  assignedContacts: string[] = [];
  selectedCategory!: number;
  categoryLabel: string | undefined = 'Select task category'
  categoryColor: string | undefined = '#FFF'
  assignedUsers: number[] = []

  constructor(private http: HttpClient, private data: DataService) {
  }

  ngOnInit(): void {
    this.data.getCategorys().subscribe((category) => {
      this.categorys = category;
    });
    setTimeout(() => {
      console.log(this.categorys);
    }, 500);

    this.data.getUsers().subscribe((users) => {
      this.filterUsers(users);
      console.log(this.users);
    })
  }


  filterUsers(users: User[]) {
    let filteredUsers: User[] = []
    users.forEach((user) => {
      let newUser = new User({
        'username': user.username,
        'id': user.id,
        'checked': false,
      });
      filteredUsers.push(newUser);
    });
    this.users = filteredUsers;
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
      assigned_to: this.assignedUsers,
      category: this.selectedCategory,
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
      this.changeImage(0, prio);
    } else {
      this.changeImage(0, this.prio)
      this.prio = prio;
      this.changeImage(1, prio);
    }
  }

  selectCategory(categoryId: number) {
    this.selectedCategory = categoryId;
    this.categoryLabel = this.getCategoryName(categoryId);
    this.categoryColor = this.getCategoryColor(categoryId);
  }

  categoryMenu: boolean = false;

  openCategoryMenu() {
    this.categoryMenu = !this.categoryMenu;
  }

  getCategoryName(categoryId: number) {
    let category = this.categorys.find((category: Category) => category.id === categoryId);
    return category?.name
  }

  getCategoryColor(categoryId: number) {
    let category = this.categorys.find((category: Category) => category.id === categoryId);
    return category?.color
  }


  assignedMenu: boolean = false;

  openAssignedMenu() {
    this.assignedMenu = !this.assignedMenu;
  }




  lowImages: string[] = ['../../../assets/img/prio_low_color.png', '../../../assets/img/prio_low.png'];
  mediumImages: string[] = ['../../../assets/img/prio_medium_color.png', '../../../assets/img/prio_medium.png'];
  urgentImages: string[] = ['../../../assets/img/prio_urgent_color.png', '../../../assets/img/prio_urgent.png'];
  currentLowImage: string = this.lowImages[0];
  currentMediumImage: string = this.mediumImages[0];
  currentUrgentImage: string = this.urgentImages[0];


  changeImage(index: number, type: string) {
    switch (type) {
      case 'L': {
        this.currentLowImage = this.lowImages[index];
        break;
      }
      case 'M': {
        this.currentMediumImage = this.mediumImages[index];
        break;
      }
      case 'U': {
        this.currentUrgentImage = this.urgentImages[index];
        break;
      }
      default: {
        break;
      }
    }
  }

  subtaskInactive: boolean = true;


  toggleSubtasks() {
    this.subtaskInactive = !this.subtaskInactive;
  }


  checkboxImages: string[] = ['../../../assets/img/checkbox.svg', '../../../assets/img/checkbox_checked.svg'];


  assignUser(user: User) {
    let index = this.assignedUsers.indexOf(user.id)
    if (index == -1) {
      this.assignedUsers.push(user.id);
      user.checked = true;
    } else {
      this.assignedUsers.splice(index, 1);
      user.checked = false;
    }
    console.log(this.assignedUsers);
  }
}






