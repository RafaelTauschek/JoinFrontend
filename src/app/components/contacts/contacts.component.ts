import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../models/model.class';
import { ContactlistComponent } from './contactlist/contactlist.component';
@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactlistComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit {
  contacts!: any;
  error!: any;
  constactOverservable = new Observable

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

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  phone!: number;

  async addContact() {
    let contact = new Contact({
      first_name: this.firstname,
      last_name: this.lastname,
      email: this.email,
      phone: this.phone
    })
    try {
      let resp = await this.postContact(contact)

    } catch (e) {
      console.error(e)
    }
  }

  postContact(contact: any) {
    const url = environment.baseUrl + '/contacts/';
    const body = contact.toJSON();
    return lastValueFrom(this.http.post(url, body))
  }


  async loadContacts() {
    const url = environment.baseUrl + '/contacts/';
    return lastValueFrom(this.http.get(url))
  }

  

  openContact(contactId: string) {
    console.log(contactId);
    let contact = this.contacts.filter((contact: any) => contact.id == contactId)
  }







}
