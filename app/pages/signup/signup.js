import {Page, NavController} from 'ionic-angular';
import {HomeTilesPage} from '../HomeTiles/HomeTiles';
import {UsersService} from '../../services/usersProvider';


@Page({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  static get parameters() {
    return [[NavController], [UsersService]];
  }

  constructor(nav, userData) {
    this.nav = nav;
    this.userData = userData;

    this.signup = {};
    this.submitted = false;
  }

  onSignup(form) {
    this.submitted = true;

    console.log(form);

    if (form.valid) {
      this.userData.signUp(signup).subscribe(
            data => {
				this.nav.push(HomeTilesPage);
			}
        );
      
    }
  }
}
