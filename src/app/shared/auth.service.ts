import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from '../model/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userUid: any = '';
  isAdmin: boolean = false;
  constructor( 
    private fireauth: AngularFireAuth, 
    private router : Router, 
    private afs: AngularFirestore,
    private alertController: AlertController) { }
  // login method
  logIn(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        this.userUid = res.user?.uid;
        localStorage.setItem('uid', this.userUid);
        this.router.navigate(['/dashboard']);
    }, err => {
      this.presentAlert('Error', err.message);
        this.router.navigate(['/']);
    })
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }


  sendUid(){
    return localStorage.getItem('uid');
  }

  logOut(){
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
      this.router.navigate(['']);
    }, err => {
      this.presentAlert('Error', err.message);
    })
  }
  
  forgetPassword(email:string){
    this.fireauth.sendPasswordResetEmail(email).then(() => {
    this.presentAlert('Update', 'Please check your mail box or spam mail box');
    this.router.navigate(['/']);
    }, err => {
      this.presentAlert('Error', err.message);
    }
    )
  }

  createUser(user: User, password: string){
    this.fireauth.createUserWithEmailAndPassword(user.email,password).then(res => {
      user.uid = res.user?.uid;
      this.afs.collection('/User').doc(user.uid).set(user);
      this.presentAlert('Update', user.name+' We welcome you to your journey on Dreams with Nuzhat');
      this.logIn(user.email, password);
    },  err => {
      alert(err.message);
     }
    )
  }

}
