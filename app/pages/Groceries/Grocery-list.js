import {OnInit} from '@angular/core';
import {Page, NavController, NavParams} from 'ionic-angular';
import {GroceryDetailsPage} from '../../pages/Groceries/Grocery-details';  
import {GroceriesService} from '../../services/GroceriesProvider';

@Page({
    templateUrl: 'build/pages/Groceries/Grocery-list.html'
})
export class GroceryListPage {

    static get parameters() {
        return [[NavController], [NavParams], [GroceriesService]];
    }

    constructor(nav, navParams, GroceriesService) {
        this.nav = nav;
        this.GroceriesService = GroceriesService;
        this.navigationComponent = navParams.get('navigationComponent');
    }

    ngOnInit() {
        this.GroceriesService.load().then(res => {
			this.groceries = res;
		});
    }

    itemTapped(event, grocery) {
        this.nav.push(GroceryDetailsPage, {
            grocery: grocery
        });
    }

}