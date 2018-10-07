import { Injectable } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';

import { UserLogs } from '../model/UserLog';

@Injectable()
export class AuthService {
  who: string;
  constructor() { }

  login(email: string, password: string, user: string) {
    this.who = user;
    return new Promise((resolve, reject) => {
    //   this.afAuth.auth.signInWithEmailAndPassword(email, password)
    //     .then(userData => resolve(userData),
    //       err => reject(err)
    //     )

    });
  }

  register(user: UserLogs) {
    return new Promise((resolve, reject) => {
    //   this.afAuth.auth.createUserWithEmailAndPassword(user.ntid + '@gmail.com', user.password)
    //     .then(userData => resolve(userData),
    //       err => reject(err)
    //     )

    });
  }

//   getAuth() {
//     return this.afAuth.authState.map(auth => auth)
//   }

  getEmail() {
    // return this.afAuth.auth.currentUser;
  }

  logout() {
    // this.afAuth.auth.signOut();
  }
}