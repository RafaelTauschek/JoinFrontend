import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../models/contact.class';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { DataService } from '../../services/data.service';
import { AddContactComponent } from './add-contact/add-contact.component';
@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactlistComponent, AddContactComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit {
  contacts!: any;
  error!: any;
  selectedContact!: Contact | null;
  private addContactMenuSubject = new BehaviorSubject<boolean>(false);
  addContactMenu = this.addContactMenuSubject.asObservable();
  editContact: boolean = false;
  isMobile: boolean = false;
  showContactList: boolean = true;

  constructor(private http: HttpClient, public data: DataService) {
    this.checkIfMobile();
  }




  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.matchMedia('(max-width: 1000px)').matches;
  }



  toggleContactList() {
    this.showContactList = !this.showContactList;
  }



  ngOnInit(): void {
      this.data.selectedContact$.subscribe((contact) => {
        this.selectedContact = contact;
      })
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
      await this.postContact(contact).then(() => {
        this.data.getContacts();
      })
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



  deleteContact(contact: Contact) {
    const url = environment.baseUrl + '/contacts/' + contact.id + '/';
    lastValueFrom(this.http.delete(url)).then(() => {
      this.data.getContacts();
      this.selectedContact = null;
    });
  }

  

  openContact(contactId: string) {
    console.log(contactId);
    let contact = this.contacts.filter((contact: any) => contact.id == contactId)
  }

  toggleAddContactMenu(value: boolean) {
    this.addContactMenuSubject.next(value)
  }







}
