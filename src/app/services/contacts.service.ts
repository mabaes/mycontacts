import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private id: number = 0;
  private contacts: Contact[] = [];
  constructor() {
    this.addContact({ email: 'alex@upv.es', name: 'Alejandro', surname: 'Perez' });
    this.addContact({ email: 'bea@upv.es', name: 'Beatriz', surname: 'Canto' });
    this.addContact({ email: 'salva@upv.es', name: 'Salvador', surname: 'Fernandez' });
  }

  addContact(contact: Contact): Contact {
    contact.id = this.id++;
    this.contacts.push(contact);
    return contact;
  }

  listContactById(id: number): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  listContacts(query?: string): Contact[] {
    let result = this.contacts;
    if (query) {
      result = this.contacts.filter((contact) => {
        return (contact.id === Number(query) ||
          (contact.email && contact.email.indexOf(query) !== -1) ||
          (contact.name && contact.name.indexOf(query) !== -1) ||
          (contact.surname && contact.surname.indexOf(query) !== -1));
      });
    }
    return result;
  }
  updateContact(contact: Contact): Contact {
    let index = this.contacts.findIndex(
      (_contact) => _contact.id === contact.id);
    if (index !== -1) this.contacts[index] = contact;
    return contact;
  }

  removeContact(id: number): boolean {
    let index = this.contacts.findIndex((_contact) => _contact.id === id);
    if (index !== -1) this.contacts.splice(index, 1);
    return index !== -1;
}
 
}
