import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Contact } from '../../../models/model.class';
import { ContactInterface } from '../../../interfaces/contact.interface';

@Component({
  selector: 'app-contactlist',
  standalone: true,
  imports: [],
  templateUrl: './contactlist.component.html',
  styleUrl: './contactlist.component.scss'
})
export class ContactlistComponent {
  contacts: Contact[] = []

  constructor(private data: DataService) {
    this.data.getContacts().subscribe((contacts) => {
      this.filterContacts(contacts);
    })
  }


  filterContacts(contacts: Contact[]) {
    let map = new Map<string, Object>();
    contacts.forEach((contact) => {
      console.log(typeof(contact));
      let firstName = contact.first_name.charAt(0);
      map.set(firstName, contact);
    });
    console.log(map);
  }

}
