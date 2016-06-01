import {App, IonicApp, Events, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';
import {HomeTilesPage} from './pages/HomeTiles/HomeTiles';
import {UsersService} from './services/usersProvider';

@App({
  templateUrl: 'build/app.html',
  providers: [UsersService],
  config: {}
})
class ConferenceApp {
  static get parameters() {
    return [
      [IonicApp], [Events], [Platform], [UsersService]
    ]
  }

  constructor(app, events, platform, userData) {
    this.app = app;
    this.events = events;
    this.userData = userData;
    this.loggedIn = false;
	
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });

    // We plan to add auth to only show the login page if not logged in
    this.root = LoginPage;

    // create an list of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    this.appPages = [
      { title: 'About', component: HomeTilesPage, index: 3, icon: 'information-circle' },
    ];

    this.loggedInPages = [
      { title: 'Logout', component: HomeTilesPage, icon: 'log-out' }
    ];

    this.loggedOutPages = [
      { title: 'Login', component: LoginPage, icon: 'log-in' },
      { title: 'Signup', component: SignupPage, icon: 'person-add' }
    ]

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.loggedIn = (hasLoggedIn == 'true');
    });

    this.listenToLoginEvents();
  }

  openPage(page) {
    // find the nav component and set what the root page should be
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');

    if (page.index) {
      nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:signup', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:logout', () => {
      this.loggedIn = false;
    });
  }
}
