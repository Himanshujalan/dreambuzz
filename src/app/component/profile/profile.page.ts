import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ProfileService  } from '../../shared/profile.service';
import { User } from 'src/app/model/user';
import { Dream } from 'src/app/model/dream';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  currentUser: string = '';
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

  constructor(
    private auth: AuthService,
    private profile: ProfileService
  ) { }

  ngOnInit(){
    this.getCurrentUserUid();
    this.getUserDetail();
    this.getDreams();
  }



  async getCurrentUserUid(){
    this.currentUser = this.auth.sendUid();
  }

  async getUserDetail(){
    await this.profile.getUserAccess( this.currentUser).subscribe(res => {
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

  async getDreams(){
    await this.profile.fetchDreamJournal(this.currentUser).subscribe(res => {
      this.dreamData = res.map((e:any) => {
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
      if (this.dreamData.length > 1) {
        event.target.disabled = true;
      }
    }, 500);
  }

}
