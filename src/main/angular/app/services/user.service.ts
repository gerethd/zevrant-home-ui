import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Constants} from "../constants/Constants";
import {User} from "../rest/response/User";
import {BehaviorSubject} from "rxjs";
import {AddRole} from "../rest/request/AddRole";
import {HttpClient} from "@angular/common/http";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {LocalStorageService} from "angular-web-storage";
import {Username} from "../rest/response/Username"
import {SnackbarService} from "./snackbar.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpService, private httpClient: HttpClient, private storage: LocalStorageService,
                private snackbarService: SnackbarService) {
    }

    private _roles: Array<BehaviorSubject<boolean>> = [];

    get roles(): Array<BehaviorSubject<boolean>> {
        return this._roles;
    }

    public getUserByName(username: String): Promise<User> {
        return this.http.get(Constants.oauthBaseUrl + `user/${username}`, null)
    }

    public updateUserInfo(user: User) {
        return this.http.put(Constants.oauthBaseUrl + "user", null, user);
    }

    public getAllUsers(): Promise<User[]> {
        return this.http.get(Constants.oauthBaseUrl + "user", null);
    }

    public async getAllUserRoles() {
        let data = await this.http.get(Constants.oauthBaseUrl + "user/all-roles", null);
        await data.forEach((role) => {
            this._roles[role] = new BehaviorSubject<boolean>(false);
        });
    }

    public async searchRoles(page: any, pageSize: any): Promise<any> {
        return this.http.get(Constants.oauthBaseUrl + `user/roles/search/${page}/${pageSize}`, null);
    }

    updateUsers(users: User[]) {
        return this.http.put(Constants.oauthBaseUrl + "user/bulk", null, users);
    }

    async getRoles(username: string) {
        if (!isNotNullOrUndefined(username)) {
            return null;
        }
        await this.http.get(Constants.oauthBaseUrl + `user/roles/${username}`, null).then(async (data) => {
            if (!isNotNullOrUndefined(this._roles) || this._roles.length === 0) {
                await this.getAllUserRoles();
            }
            data.forEach((role) => {
                this._roles[role].next(true);
            })
        }).catch((error) => {
            if (error && error.error && error.error.error == "invalid_token") {
                this.storage.clear();
            }
        });

    }

    addRole(role: string, desc: string) {
        let addRole = new AddRole(role, desc);
        return this.http.post(Constants.oauthBaseUrl + "user/roles", null, addRole);
    }

    hasRole(role: string): BehaviorSubject<boolean> {
        if (isNotNullOrUndefined(this._roles[role])) {
            return this._roles[role];
        }
        this._roles[role] = new BehaviorSubject<boolean>(false);
        return this._roles[role];
    }

    deleteRoles() {
        this._roles.forEach((role) => {
            role.next(false);
        })
        this._roles = [];
    }

    public async getUsername(): Promise<Username> {
        try {
            return this.http.get(Constants.oauthBaseUrl.concat("user/username"), null);
        } catch (exception) {
            console.error(exception)
            this.snackbarService.displayMessage(exception.error.error + " " + exception.error.message, 10000)
        }
    }
}
