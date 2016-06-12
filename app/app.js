import {App, IonicApp, Events, Platform} from 'ionic-angular';
import {ViewChild} from '@angular/core';  
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';
import {HomeTilesPage} from './pages/HomeTiles/HomeTiles';
import {GroceryListPage} from './pages/Groceries/Grocery-list';

import {UsersService} from './services/usersProvider';
import {GroceriesService} from './services/GroceriesProvider';
import {TilesProvider} from './services/TilesProvider';

@App({
  templateUrl: 'build/app.html',
  providers: [UsersService, GroceriesService, TilesProvider],
  config: {}
})
class ConferenceApp {
  static get parameters() {
    return [
      [IonicApp], [Events], [Platform], [UsersService], [GroceriesService], [TilesProvider] 
    ]
  }

  
  constructor(app, events, platform, userData, GroceriesData, tilesData) {
    this.app = app;
    this.events = events;
    this.userData = userData;
	this.groceriesData = GroceriesData;
	this.tilesData = tilesData;
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
    // this.appPages = [
      // { title: 'About', component: HomeTilesPage, index: 1, icon: 'information-circle' },
	  // { title: 'About', component: HomeTilesPage, index: 1, icon: 'information-circle' },
    // ];

    this.loggedInPages = [
	  { title: 'Home', component: HomeTilesPage, icon: 'home' },	
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

  }
  
  ngAfterViewInit(){
    this.listenToLoginEvents();
	this.loadSideMenuData();
  }

  loadSideMenuData()
  {
		this.tilesData.load().then(res => 
			{
				this.appPages = res;
			} 
		);
  }
  
  toggleGroup(group) {
		if(group.items.length > 0){
			group.show = !group.show;
		}
		else{
			this.openPage(group);
		}	
  }
  
  isGroupShown(group) {
    return group.show;
  };
  
  openPage(page) {
    // find the nav component and set what the root page should be
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getActiveNav(); //getComponent('nav');
	let navigationComponent = this.navigationComponent(page.Code);
    // if (page.index) {
      // nav.setRoot(page.component, {tabIndex: page.index});
    // } else {
      // nav.setRoot(page.component);
    // }
	nav.setRoot(navigationComponent , {navigationComponent : page});
	
    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  navigationComponent(code){
	  if(code == "FRUITSVEGETABLES" || code == "GROCANDSTAPLES" || code == "BREADDIARYEGGS")
		  return GroceryListPage;
	  else
		  return HomeTilesPage;
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
