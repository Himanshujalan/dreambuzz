import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ProfileService  } from '../../shared/profile.service';
import { User } from 'src/app/model/user';
import { Dream } from 'src/app/model/dream';
import { IonInfiniteScroll } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-dream-journal',
  templateUrl: './dream-journal.page.html',
  styleUrls: ['./dream-journal.page.scss'],
})
export class DreamJournalPage implements OnInit {

  currentUser: string = '';
  date: any;
  time: any;
  good: boolean = true;
  description: string = '';

  userData: any = [];

  dreamObj: Dream = {
    uid: '',
    date: '',
    userId: '',
    good: true,
    time: '',
    description: '',
    name: '',
  }

  constructor(
    private auth: AuthService,
    private profile: ProfileService,
    public datepipe: DatePipe,
  ) { }

  ngOnInit() {
    this.initiateDate();
    this.getCurrentUserUid();
    this.getCurrentUserDetail();
  }

  async getCurrentUserUid(){
    this.currentUser = this.auth.sendUid();
  }


  initiateDate(){
    let customDate = new Date().toString();
    this.date =this.datepipe.transform(customDate, 'dd-MM-yyyy');
    this.time =this.datepipe.transform((new Date), 'HH:mm');
  }

   async getCurrentUserDetail(){
    await this.profile.getUserAccess(this.currentUser).subscribe(res => {
      this.userData = res.data();
      this.dreamObj.name = this.userData.name;
      console.log(this.dreamObj);
     } , err => {
       alert('Error while fetching data, please refresh the page!');
     }
     )
   }

   
   resetForm(){
    this.good = true;
    this.description = '';
   }

 createDreamJournal(){
    this.dreamObj.userId = this.currentUser;
    this.dreamObj.date = this.date;
    this.dreamObj.time = this.time;
    this.dreamObj.good = this.good;
    this.dreamObj.description = this.description;
    this.profile.createDream(this.dreamObj);
    this.resetForm();
  }

}
