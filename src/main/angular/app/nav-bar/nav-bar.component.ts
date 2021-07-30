import {Component, OnInit} from '@angular/core';
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {ADMIN_ROLE, CAMERA_ROLE, Constants, PRINTS_ROLE} from "../constants/Constants";
import {PlatformLocation} from "@angular/common";
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {HttpService} from "../services/http.service";
import {LocalStorageService} from "angular-web-storage";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../services/user.service";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

    username: string;
    public ADMIN_ROLE = ADMIN_ROLE;
    public PRINTS_ROLE = PRINTS_ROLE;
    public CAMERA_ROLE = CAMERA_ROLE;
    public Promise = Promise;
    public userLoggedIn: boolean = undefined;
    private baseUrl: string;
    private subcription: any;
    private logoutSubscription: any;

    constructor(private storage: LocalStorageService, private http: HttpService,
                private platformLocation: PlatformLocation, private router: Router, private loginService: LoginService,
                private userService: UserService) {
        this.http.get(Constants.oauthBaseUrl.concat("user/username"), null).then(data => {
          console.log("Username4: ", JSON.stringify(data))
        })
        this.baseUrl = Constants.baseUrl;
        this.username = (this.storage.get(Constants.username)) ? this.storage.get("username") : "Login";
        this.userService.roles[ADMIN_ROLE] = new BehaviorSubject<boolean>(false);
        this.userService.roles[PRINTS_ROLE] = new BehaviorSubject<boolean>(false)
    }
//
    ngOnInit() {
        if (this.isLoggedIn()) {
            this.username = (this.storage.get(Constants.username));
            this.userService.getAllUserRoles()
            this.getRoles();
        }

        this.subcription = this.loginService.getLoginEmitter().subscribe(async (event) => {
            await this.getRoles();
            await this.userService.getAllUserRoles();
            // let username =

            console.log("USERNAME2: " + JSON.stringify(await this.userService.getUsername()))
            this.userService.getUsername().then((data) => {
              console.log("USERNAME3: " + JSON.stringify(data))
            }).catch(err => {
              console.error(JSON.stringify(err))
            })
            // this.storage.set(Constants.username, username);
            // this.username = username;
            // this.userLoggedIn = undefined;
            // window.location.reload()
        });

        this.logoutSubscription = this.loginService.logoutEmitter.subscribe(() => {
            this.username = null;
            this.userService.deleteRoles();
            this.router.navigate([""]);
            window.location.reload()
        })

    }

    public hasRole(role: string) {
        return this.userService.roles[role];
    }

    public async getRoles() {
        if (this.username !== 'Login') {
            await this.userService.getRoles(this.username)
        }
    }

    public isLoggedIn(): boolean {
        return isNotNullOrUndefined(this.storage.get(Constants.username)) && isNotNullOrUndefined(this.storage.get(Constants.oauthTokenName));
    }

    public logout() {
        this.username = "Login";
        this.storage.clear();
        this.userLoggedIn = undefined;
        this.loginService.logoutEmitter.emit("logged out");
    }

}
