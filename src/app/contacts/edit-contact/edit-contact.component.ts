import { Validators } from '@angular/forms';
/******
 Angular Lib
 ******/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
// Contact Service ...
import { ContactService } from '../shared/contact.service';


@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  // props..
  id;
  contactsData;
  currentContact;
  fileName: string;

  // initial form data
  editForm: FormGroup;
  firstName;
  middleName;
  lastName;
  email;
  dob;
  age;
  phoneNumberOne;
  phoneNumberTwo;
  permanentAddress;
  alternateAddress;
  avatar;
  // class constructor
  constructor(
    private route: ActivatedRoute,
    private _contactsService: ContactService
  ) {
    this.id = route.snapshot.paramMap.get('id');
  }

  setCurrentContact(contacts , id) {
    return contacts.map((contact) => {
      const contactId  = Number(id);
      // console.log(typeof(contactId) , typeof(contact.id))
      // console.log(contact.id);
      if (contact.id === contactId ) {
        // console.log(contact.id)
        return this.currentContact = contact;
      }
    });
  }

  setImagePreview(event) {
    this.fileName = event.name;
    this.avatar = event.dataURL;
    this.editForm.controls.avatar.setValue(event.dataURL);
    return;
  }

  onSubmit(editForm) {
    console.log(editForm.value);
  }

  onDateChange(event) {
    // tslint:disable-next-line:prefer-const
    let dob =  new Date(event.targetElement.value),
        // tslint:disable-next-line:prefer-const
        cd = new Date(),
        // tslint:disable-next-line:prefer-const
        diff = cd.getFullYear() - dob.getFullYear();

          if ( cd.getDate() >= dob.getDate() && cd.getDay >= dob.getDay ) {
            return this.editForm.controls.age.setValue(diff);
          }else if ( cd.getDate() < dob.getDate() && cd.getDay() < dob.getDay() ) {
            return this.editForm.controls.age.setValue(diff - 1);
          }

  }

  ngOnInit() {
    // setting a initial data from the service...
    this.contactsData = this._contactsService.getContacts();
    // finding an id of the current form.
    // console.log(this.id);
    // finding the current selected contact..
    this.setCurrentContact(this.contactsData, this.id);
    console.log(this.id , this.currentContact);
    // edit form initialization ..
    this.firstName = this.currentContact.firstName;
    this.middleName = this.currentContact.middleName;
    this.lastName = this.currentContact.lastName;
    this.email = this.currentContact.email;
    this.dob = this.currentContact.dob;
    this.age = this.currentContact.age;
    this.phoneNumberOne = this.currentContact.phoneNumberOne;
    this.phoneNumberTwo = this.currentContact.phoneNumberTwo;
    this.permanentAddress = this.currentContact.permanentAddress;
    this.alternateAddress = this.currentContact.alternateAddress;
    this.avatar = this.currentContact.avatar;

    this.editForm = new FormGroup({
      firstName: new FormControl(this.firstName , Validators.required),
      middleName: new FormControl(this.middleName , Validators.required),
      lastName: new FormControl(this.lastName , Validators.required),
      email: new FormControl(this.email , Validators.required),
      dob: new FormControl(null , Validators.required),
      age: new FormControl(this.age , Validators.required),
      phoneNumberOne: new FormControl(this.phoneNumberOne , Validators.required),
      phoneNumberTwo: new FormControl(this.phoneNumberTwo , Validators.required),
      permanentAddress: new FormControl(this.permanentAddress , Validators.required),
      alternateAddress: new FormControl(this.alternateAddress , Validators.required),
      avatar: new FormControl(this.avatar , Validators.required),
    });
  }

}
