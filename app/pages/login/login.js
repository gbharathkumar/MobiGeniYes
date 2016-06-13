import {IonicApp, Page, NavController, Events} from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {UsersService} from '../../services/usersProvider';
import {HomeTilesPage} from '../HomeTiles/HomeTiles';

@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  static get parameters() {
    return [[NavController], [UsersService], [Events]];
  }

  constructor(nav, userData, events) {
    this.nav = nav;
    this.userData = userData;
	this.events = events;

    this.login = {};
    this.submitted = false;
  }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signIn(this.login).subscribe(
            data => {
				this.nav.push(HomeTilesPage);
			}
        );
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
  
  startApp() {
	this.events.publish('user:navigated');
    this.nav.push(HomeTilesPage);
  }
}
