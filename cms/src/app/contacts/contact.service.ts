import { Injectable, Output, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService {
selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[]=[];

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.getContacts();
   }
   
   getContacts() {
    return this.contacts.slice();
   }
   getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }
  
  }