import {Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { UserLogs } from '../../model/UserLog';

// import { AuthService } from '../../services/auth.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  // private subscription: ISubscription;

  user: UserLogs;
  
  @ViewChild('loginForm') form: any;
  constructor(
    // private authService: AuthService,
    // private router: Router,
    // /private flashMsg: FlashMessagesService, 
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    let self = this;
    self.user = { ntid: "", password: "" };
    // self.subscription = self.authService.getAuth().subscribe(auth => {
      // console.log(self.authService.who);
//       if (auth) {
//         console.log('logged in ' + localStorage.getItem("token"));
//         if (localStorage.getItem("token") == "user") {
//           self.router.navigate(['/chat']);
//         }
//         else if (localStorage.getItem("token") == "consultant") {
//           self.router.navigate(['/consultant']);
//         }
//       }
//       else {
//         // console.log('Logged out');
//         self.router.navigate(['/']);
//       }
//       if (!self.changeDetectorRef['destroyed']) {
//         self.changeDetectorRef.detectChanges();
//       }
//     })
//   }
  }
//   onSubmit({ value, valid }: { value: UserLogs, valid: Boolean }) {
//     let self = this;
//     localStorage.setItem("token", "user");

//     self.authService.login(value.ntid + '@gmail.com', value.password, "user")
//       .then(res => {

//         self.router.navigate(['/chat']);
//         self.changeDetectorRef.markForCheck();
//       }).catch(err => {

//         self.flashMsg.show(err.message,
//           { cssClass: 'alert-danger', timeout: 4000 });
//       })
//   }

//   onSubmit1({ value, valid }: { value: UserLogs, valid: Boolean }) {
//     let self = this;
//     localStorage.setItem("token", "consultant");
//     self.authService.login(value.ntid + '@gmail.com', value.password, "consultant")
//       .then(res => {

//         self.router.navigate(['/consultant']);
//         self.changeDetectorRef.markForCheck();
//       }).catch(err => {

//         self.flashMsg.show(err.message,
//           { cssClass: 'alert-danger', timeout: 4000 });
//           self.form.reset();
//       })
//   }

  ngOnDestroy() {
    this.changeDetectorRef.detach();
    // this.subscription.unsubscribe();
  }
// }
  }