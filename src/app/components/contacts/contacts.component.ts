import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit {
  contacts!: any;
  error!: any;

  constructor(private http: HttpClient) {

  }
  // first_name = models.CharField(max_length=30, default=None)
  // last_name = models.CharField(max_length=30, default=None)
  // short_name = models.CharField(max_length=3, default=None)
  // email = models.EmailField(max_length=200, default=None)
  // phone_number = PhoneField(blank=True, help_text='Contact phone number')
  // color = models.CharField(max_length=20, default='', blank=True)
  async ngOnInit() {
    try {
      this.contacts = await this.loadContacts();
      console.log(this.contacts);
    } catch (e) {
      this.error = 'Fehler beim Laden!';
    }
  }


  async loadContacts() {
    const url = environment.baseUrl + '/contacts/';
    return lastValueFrom(this.http.get(url))
  }
}
