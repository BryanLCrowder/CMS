import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact[]>();
  // contactChangedEvent = new Subject<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
    this.getContacts();
  }

  storeContacts() {
    this.contacts = JSON.parse(JSON.stringify(this.contacts));
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put('https://cms-project-7eb11.firebaseio.com/contacts.json', this.contacts, { headers: header})
      .subscribe(
        (contacts: Contact[]) => {
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

  getContacts() {
    this.http.get('https://cms-project-7eb11.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contacts.sort((a, b) => (a['name'] < b['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);
          this.contactListChangedEvent.next(this.contacts.slice());
        }, (error: any) => {
          console.log('something bad happened...');
        }
      );
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (contact === null || contact === undefined) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact === null) {
      return;
    }

    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact,
                newContact: Contact) {
    if (originalContact === null || newContact === null
      || originalContact === undefined || newContact === undefined) {
      return;
    }

    newContact.id = originalContact.id;
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    this.contacts[pos] = newContact;
    this.storeContacts();
  }
}
