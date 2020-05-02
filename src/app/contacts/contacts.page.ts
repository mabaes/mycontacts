import { Component, OnInit } from '@angular/core';
import {Contact} from '../models/contact';
import { ContactsService } from '../services/contacts.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  private myContacts: Contact[];
  constructor(private contacts: ContactsService, private alertCtrl: AlertController) { }

  ngOnInit() {
    console.log('ngOnInit ContactsPage');
    this.listContacts();
  }
  listContacts() {
    console.log('[ContactsPage] listContacts()');
    this.myContacts = this.contacts.listContacts().sort();
  }

  /* sin await */
  /*
  removeContact(contact: Contact) {
    console.log(`[ContactsPage] removeContact(${contact.id})`);
    this.alertCtrl.create({
      header: 'Remove contact',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { console.log('Cancel clicked'); }
        },
        {
          text: 'Accept',
          handler: () => {
            this.contacts.removeContact(contact.id);
            this.listContacts();
          }
        }
      ]
    }).then((alert) => alert.present());
  }
  */
  async removeContact(contact: Contact) {
    console.log(`[ContactsPage] removeContact(${contact.id})`);
    const alert = await this.alertCtrl.create({
      header: 'Remove contact',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { console.log('Cancel clicked'); }
        },
        {
          text: 'Accept',
          handler: () => {
            this.contacts.removeContact(contact.id);
            this.listContacts();
          }
        }
      ]
    });
    await alert.present();
  }

}
