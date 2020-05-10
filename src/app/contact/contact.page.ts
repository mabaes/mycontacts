import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactsService } from '../services/contacts.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  private title: string;
  private mode: string;
  private contact: Contact;
  private options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
    };

  constructor(private camera: Camera, private contacts: ContactsService, private route: ActivatedRoute, private location: Location) {
    if (this.route.snapshot.paramMap.get('id')) {
      this.contact = this.contacts.listContactById(Number(this.route.snapshot.paramMap.get('id')));
      this.mode = this.route.snapshot.queryParamMap.get('mode') || 'view';
      if (this.mode === 'view') {
        this.title = 'Contact';
      } else {
        this.title = 'Edit';
        this.contact = {
          id: this.contact.id,
          email: this.contact.email,
          name: this.contact.name,
          surname: this.contact.surname,
          avatar: this.contact.avatar
        }
      }

    } else {
      this.contact = { email: '', name: '', surname: '' };
      this.mode = 'add';
      this.title = 'Add';
    }
  }

    ngOnInit() {
    }

  save() {
    console.log('[ContactPage] save()');
    if (this.mode === 'edit') {
      this.contacts.updateContact(this.contact);
    } else {
      this.contacts.addContact(this.contact);
    }
    this.location.back();
  }

  changeAvatar() {
    console.log('[ContactPage] changeAvatar()');
    this.camera.getPicture(this.options).then((imageData) => {
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.contact.avatar = base64Image;
    }, (err) => {
    // Handle error
    }
    );
    }

  }
