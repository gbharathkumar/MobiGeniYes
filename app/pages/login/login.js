import {IonicApp, Page, NavController} from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {UsersService} from '../../services/usersProvider';
import {HomeTilesPage} from '../HomeTiles/HomeTiles';

@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  static get parameters() {
    return [[NavController], [UsersService]];
  }

  constructor(nav, userData) {
    this.nav = nav;
    this.userData = userData;

    this.login = {};
    this.submitted = false;
  }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signIn(login).subscribe(
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
    this.nav.push(HomeTilesPage);
  }
}
