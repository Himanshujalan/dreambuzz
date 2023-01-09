import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ProfileService  } from '../../shared/profile.service';
import { User } from 'src/app/model/user';
import { Dream } from 'src/app/model/dream';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  currentUser: string = '';
  userList: User[] =[];
  userData: any = [];
  dreamData: Dream[] = [];
  userName: string = '';
  userEmail: string = '';
  userAbout: string = '';
  userAge: string = '';
  userGender: string = '';
  userMobile: string = '';
  userState: string = '';
  userCity: string = '';

  showAllUsers: boolean = true;

  constructor(
    private auth: AuthService,
    private profile: ProfileService
  ) { }

  ngOnInit() {
    this.getUserList();
  }


  async getUserDetail(uid: string){
    await this.profile.getUserAccess(uid).subscribe(res => {
      this.userData = res.data();
      this.userEmail = this.userData.email;
      this.userAbout = this.userData.about 
      this.userAge = this.userData.age;
      this.userGender = this.userData.gender;
      this.userMobile = this.userData.mobile;
      this.userState = this.userData.state;
      this.userCity = this.userData.city;
      this.userName = this.userData.name;
     } , err => {
       alert('Error while fetching data, please refresh the page!');
     }
     )
  }

  showUserDetail(uid: string){
    this.showAllUsers = false;
    this.getUserDetail(uid);
    this.getDreams(uid);

  }

  async getDreams(uid: string){
    await this.profile.fetchDreamJournal(uid).subscribe(res => {
      this.dreamData = res.map((e:any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error while fetching data, please refresh the page!');
    })
  }

  async getUserList(){
    await this.profile.getAllUser().subscribe(res => {
      this.userList = res.map((e:any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error while fetching data, please refresh the page!');
    })
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      if (this.userList.length > 1) {
        event.target.disabled = true;
      }
    }, 500);
  }

}
