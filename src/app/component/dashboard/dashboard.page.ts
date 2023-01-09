import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Dream } from 'src/app/model/dream';
import { IonInfiniteScroll } from '@ionic/angular';
import { ProfileService  } from '../../shared/profile.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  dreamData: Dream[] = [];

  constructor(
    private auth: AuthService,
    private profile: ProfileService
  ) { }

  ngOnInit() {
    this.getDreams();
  }

  signOut(){
    this.auth.logOut();
  }


  async getDreams(){
    await this.profile.fetchDream().subscribe(res => {
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
      if (this.dreamData.length > 5) {
        event.target.disabled = true;
      }
    }, 500);
  }


}
