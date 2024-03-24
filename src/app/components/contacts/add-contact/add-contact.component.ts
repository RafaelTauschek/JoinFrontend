import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { first, lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Contact } from '../../../models/contact.class';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent{
  @Output() addContactMenu = new EventEmitter<boolean>();
  name: string = '';
  email: string = '';
  phone: number | null = null;
  selectedContact!: Contact | null;

  constructor(private http: HttpClient, private data: DataService) {
    this.data.selectedContact$.subscribe(contact => {
      this.selectedContact = contact
    });
  }




  colors = [
    { name: "Light Pink", hex: "#68A694" },
    { name: "Gold", hex: "#A69168" },
    { name: "Blue", hex: "#6878A6" },
    { name: "Light Brown", hex: "#DE6F0D" },
    { name: "Olive Green", hex: "#8CA668" },
    { name: "Purple", hex: "#8C68A6" },
    { name: "Green", hex: "#82A668" },
    { name: "Salmon", hex: "#A67168" },
    { name: "Pale Yellow", hex: "#A69E68" },
    { name: "Lavender", hex: "#9468A6" },
    { name: "Mint Green", hex: "#68A684" },
    { name: "Reddish Pink", hex: "#A6697B" },
    { name: "Peach", hex: "#A68568" },
    { name: "Dark Blue", hex: "#687BA6" },
    { name: "Burnt Orange", hex: "#A67B68" },
    { name: "Light Blue", hex: "#68A1A6" },
    { name: "Magenta", hex: "#A6689A" },
    { name: "Orange", hex: "#FFA668" },
    { name: "Dark Purple", hex: "#7373A6" },
    { name: "Türkis", hex: "#68A6A6" },
    { name: "Yellow", hex: "#A6A668" },
    { name: "Dark Blue", hex: "#6871A6" },
    { name: "Aqua", hex: "#68A0A6" },
    { name: "Dark Salmon", hex: "#A67373" },
    { name: "Light Brown", hex: "#A68C68" },
    { name: "Dark Salmon", hex: "#A67373" }
  ];

  getRandomColor() {
    let number = Math.floor(Math.random() * 25);
    let color = this.colors[number].hex;
    return color;
  }

  splitName() {
    let test = this.name.split(' ');
    if (test.length === 2) {
      let firstName = test[0];
      let lastName = test[1];
      return { firstName, lastName }
    } else {
      let firstName = test;
      let lastName = '';
      return { firstName, lastName }
    }
  }


  async addContact() {
    let color = this.getRandomColor();
    let name = this.splitName();

    let contact = new Contact({
      first_name: name.firstName,
      last_name: name.lastName,
      email: this.email,
      phone_number: this.phone,
      color: color,
    });

    try {
      let resp = await this.postContact(contact);
      console.log(resp);
    } catch (e) {
      console.error(e);
    }
  }


  async postContact(contact: Contact) {
    const url = environment.baseUrl + '/contacts/';
    const body = contact.toJSON();
    console.log('Body ', body);
    return lastValueFrom(this.http.post(url, body));
  }



  closeMenu(state: boolean): void {
    this.addContactMenu.emit(state)
  } 


  cancel() {
    this.name = '';
    this.email = '',
    this.phone = null;
    this.closeMenu(false);
  }
}
