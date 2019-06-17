import { Injectable, Output, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable()
export class ContactService {
selectedContactEvent = new EventEmitter<Contact>();
contactChangedEvent = new Subject<Contact[]>();
contactListChangedEvent = new Subject<Contact[]>();

  contacts: Contact[]=[];
  maxContactId: number;

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
  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
  }
  addContact(newContact: Contact) {
    if (newContact === null) {
      return;
    }

    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
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
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }
  }