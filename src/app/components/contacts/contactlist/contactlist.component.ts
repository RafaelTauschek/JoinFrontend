import { Component, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Contact } from '../../../models/contact.class';
import { CommonModule } from '@angular/common';
import { ContactInterface } from '../../../interfaces/contact.interface';

@Component({
  selector: 'app-contactlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contactlist.component.html',
  styleUrl: './contactlist.component.scss'
})
export class ContactlistComponent {
  contactList = new Map<string, ContactInterface[]>();
  @Input() addContact = false;

  constructor(private data: DataService) {
    this.data.getContacts().subscribe((contacts) => {
      this.filterContacts(contacts);
    })
  }


  filterContacts(contacts: Contact[]) {
    let map = new Map<string, ContactInterface[]>();

    contacts.forEach((contact) => {
      let firstName = contact.first_name.charAt(0);
      if (map.has(firstName)) {
        map.get(firstName)?.push(contact);
      } else {
        map.set(firstName, [contact])
      }
    });
    this.contactList = map
    console.log(this.contactList);
  }

  selectContact(contact: Object) {
    this.data.selectContact(contact as Contact)
  }

  openAddContact() {
    // this.addContactMenu = !this.addContactMenu
    // console.log(this.addContactMenu);
  }
}
