import { Component, OnInit } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId: any = '';
  user: User = new User;
  users$!: Observable<any[]>;
  usersCollection = collection(this.firestore, 'users');


  constructor(private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog) {

  }


  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log('meine id:', this.userId);
      this.getUser();
    });
    // this.getUser();
  }


  async getUser() {
    if (this.userId) {   //wegen fehlermeldung beim testen eingebaut
      const userDoc = doc(this.usersCollection, this.userId);
      const user = (await getDoc(userDoc)).data();
      this.user = new User(user);
      console.log('getUser function , ein user:', user);
    }
  }

  openEditUser() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
    // dialog.componentInstance.userUpdated$.subscribe((updatedUser: User) => {  //ggf. ander möglichkeit als hier und bei openeditadress mit dialog.afterClosed().subscribe() und dann nochmal getuser() aufrufen
    //   this.user = updatedUser;
    dialog.afterClosed().subscribe((result: any) => {  //hier mit der afterclosed() klappt es auch unten in openeditaddress ist es noch ander wie mit chatgpt
      console.log(`Dialog result: ${result}`); 
      this.getUser();
    });
    // })
  }


  openEditAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
    // Subscribe to the userUpdated$ Observable in the DialogEditAddressComponent
    dialog.componentInstance.userUpdated$.subscribe((updatedUser: User) => {
      // Update the user data when the address is edited
      this.user = updatedUser;
    })
  }
}
