import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  allUsers: User[] = [];

  users$!: Observable<any[]>;
  usersCollection = collection(this.firestore, 'users');


  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  
  ngOnInit(): void {
    this.users$ = collectionData(this.usersCollection, {idField: 'id'});
    this.users$.subscribe((userData: any) => {
      console.log('Recived changes from database:', userData);
      this.allUsers = userData;      
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }
}
