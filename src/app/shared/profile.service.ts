import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Dream } from '../model/dream';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private afs: AngularFirestore) { }

  getAllUser(){
    return this.afs.collection('/User').snapshotChanges();
  }

  getUserAccess(uid: any){
    return this.afs.collection('/User').doc(uid).get();
  }

  createDream(dream: Dream){
    dream.uid = this.afs.createId();
    this.createDreamJournal(dream);
    return this.afs.collection('/Journal').doc(dream.uid).set(dream);
  }

  fetchDream(){
    return this.afs.collection('/Journal').snapshotChanges();
  }

  createDreamJournal(dream: Dream){
    return this.afs.collection('/User').doc(dream.userId).collection('/journal').doc(dream.date+'-'+'-'+dream.time).set(dream);

  }

  fetchDreamJournal(uid: string){
    return this.afs.collection('/User').doc(uid).collection('/journal').snapshotChanges();
  }


}
