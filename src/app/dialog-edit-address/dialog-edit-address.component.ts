import { Component } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  // user!: User;    //alte version vor dem testen, fürs testen wird der leere user definiert und später überschrieben.
  user: User =new User();
  loading = false;
  users$!: Observable<any[]>;
  usersCollection = collection(this.firestore, 'users');
  userId: any = '';
  userUpdated$: Subject<User> = new Subject<User>();



  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private firestore: Firestore) {

  }


  updateUserAddress() {
    this.loading = true;
    const noticeDoc = doc(this.usersCollection, this.userId);
    updateDoc(noticeDoc, this.user.toJSON())
      .then((result: any) => {
        this.loading = false;
        console.log('ob updateUserAddress geht:', this.user);
        this.userUpdated$.next(this.user); // Send the updated user data
        this.dialogRef.close();
      });;
  }
}
