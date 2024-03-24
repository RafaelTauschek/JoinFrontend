import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Data, Router } from '@angular/router';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private as: AuthService, private router: Router, private data: DataService) {}


  async login() {
    try {
      let resp: any = await this.as.loginWithUsernameAndPassword(this.username, this.password);
      console.log(resp);
      this.data.currentUserSubject.next(resp.user_id)
      localStorage.setItem('token', resp['token']);
      this.router.navigateByUrl('/main')
    } catch (e) {
      console.log(e)
    }
  }



  



}


