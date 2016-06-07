import {IonicApp, Page, NavController} from 'ionic-angular';
import {TilesProvider}      from '../../services/TilesProvider';
import {GroceryListPage} from '../../pages/Groceries/Grocery-list';

@Page({
	templateUrl : "build/pages/HomeTiles/HomeTiles.html", 
	providers : [TilesProvider]
})
export class HomeTilesPage{
	static get parameters(){
		return [[IonicApp], [NavController], [TilesProvider]];
	}
	
	constructor(ionicApp, navController, TilesProvider){
		this.app = ionicApp;
		this.nav = navController;
		this.tileProvider = TilesProvider;
		this.mySlideOptions = {
			initialSlide: 0,
			loop: true, 
			autoplay : 1000,
		  };
		this.loadHomeTiles();
	}
	
	loadHomeTiles(){
		this.tileProvider.load().then(res => {
			this.HomeTiles = res;
		});
	}
	
    itemTapped(event, tile) {
        this.nav.push(GroceryListPage, {
            tile: tile
        });
    }	
	
}