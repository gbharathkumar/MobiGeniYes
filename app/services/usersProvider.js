import {Injectable} from '@angular/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable'; 
import 'rxjs/Rx';
import {SERVER_URL} from './config';

let signUpURL = SERVER_URL + 'auth/signup/',
    signInURL = SERVER_URL + 'auth/signin/',
    signOutURL = SERVER_URL + 'auth/signout/';

@Injectable()
export class UsersService {

    static get parameters() {
        return [[Http], [Events]];
    }

    constructor (http, events) {
        this.http = http;
		this.storage = new Storage(LocalStorage);
		this.events = events;
		this.HAS_LOGGED_IN = 'hasLoggedIn';
    }
	
    signIn(user) {
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
		this.storage.set(this.HAS_LOGGED_IN, true);
		this.events.publish('user:login');
        return this.http.post(signInURL, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
	
    signOut(user) {
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
		this.storage.remove(this.HAS_LOGGED_IN);
		this.events.publish('user:logout');
        return this.http.post(signOutURL, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    signUp(user) {
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
		this.storage.set(this.HAS_LOGGED_IN, true);
		this.events.publish('user:signup');
        return this.http.post(signUpURL, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
	
	
    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error'); 
    }
	
	hasLoggedIn() {
		return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
		  return value;
		});
	}
}