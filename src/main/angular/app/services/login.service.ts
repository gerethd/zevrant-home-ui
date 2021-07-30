import {EventEmitter, Injectable} from '@angular/core';
import {Constants} from "../constants/Constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorageService} from "angular-web-storage";
import {LoginResponse} from "../rest/response/LoginResponse";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginEmitter: EventEmitter<string> = new EventEmitter<string>();
  private _logoutEmitter: EventEmitter<string> = new EventEmitter<string>();
  constructor(private local: LocalStorageService, private http: HttpClient) {

  }

  getLoginEmitter(): EventEmitter<String> {
    return this.loginEmitter;
  }

  get logoutEmitter(): EventEmitter<string> {
    return this._logoutEmitter;
  }


  login(username: string, password: string, twoFactor): Promise<any> {

    let body = new URLSearchParams();
    body.set('client_id', username);
    body.set('client_secret', password);
    body.set('grant_type', 'client_credentials');
    body.set('scope', 'DEFAULT');

    let headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")

    return this.http.post(Constants.oauthBaseUrl + "oauth/token", body.toString(), {headers: headers}).toPromise().then((data) => {
      let response: LoginResponse = JSON.parse(JSON.stringify(data));
      this.local.set(Constants.oauthTokenName, response.access_token);
      let local = this.local;
      let logoutEmitter = this.logoutEmitter;
      new Promise((res) => {
        setTimeout(function() {
          local.clear();
          logoutEmitter.emit("loggedOut");
        }, response.expires_in * 1000);
      });
      this.loginEmitter.emit("loggedIn");

    });

  }

  forgotPassword(emailAddress: string){
    let body = {
      emailAddress: emailAddress
    };
    return this.http.post(Constants.oauthBaseUrl + "user/forgot-password", body, {headers: null}).toPromise();
  }

  resetPassword(token: string, password: string, passwordConfirmation: string, username: string) {
    let headers = new HttpHeaders();
    headers = headers.set("authorization", `bearer ${token}`);
    let body = {
      username: username,
      originalUsername: username,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    return this.http.put(Constants.oauthBaseUrl + "user/password-reset", body, {headers: headers}).toPromise();
  }

  logout() {
    this.logoutEmitter.emit("loggedout");
  }

}
