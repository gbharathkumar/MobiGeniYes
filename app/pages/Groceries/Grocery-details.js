import {Page, NavController, NavParams, Alert, ActionSheet} from 'ionic-angular';
import {GroceriesService} from '../../services/GroceriesProvider'; 

@Page({
    templateUrl: 'build/pages/Groceries/Grocery-details.html'
})
export class GroceryDetailsPage {

    static get parameters() {
        return [[NavController], [NavParams], [GroceriesService]];
    }

    constructor(nav, navParams, groceryService) {
        this.nav = nav;
        this.groceryService = groceryService;
        this.grocery = navParams.get('grocery');
    }


    share(event, grocery) {
        let actionSheet = ActionSheet.create({
            buttons: [
                {
                    text: 'Text',
                    handler: () => {
                        console.log('Text clicked');
                    }
                },
                {
                    text: 'Email',
                    handler: () => {
                        console.log('Email clicked');
                    }
                },
                {
                    text: 'Facebook',
                    handler: () => {
                        console.log('Facebook clicked');
                    }
                },
                {
                    text: 'Twitter',
                    handler: () => {
                        console.log('Twitter clicked');
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        this.nav.present(actionSheet);
    }



}