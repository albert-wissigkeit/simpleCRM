import { Component } from '@angular/core';
import { Firestore, addDoc, collection, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  loading = false;

  users$!: Observable<any[]>;
  usersCollection = collection(this.firestore, 'users');

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: Firestore) {

  }


  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current User is:', this.user);
    this.loading = true;
    addDoc(this.usersCollection, this.user.toJSON())
      .then((result: any) => {
        this.loading = false;
        console.log('Adding User finished:', result)
        this.dialogRef.close();
      });;
  }
}
