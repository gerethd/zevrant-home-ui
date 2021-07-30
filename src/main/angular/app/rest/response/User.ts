export class User {

    constructor(private _username: string, private _originalUsername: string, private _password: string, private _passwordConfirmation: string,
                private _emailAddress: string, private _roles: Array<string>, private _subscribed: boolean, private _twoFactorEnabled: boolean) {
    }


    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get originalUsername(): string {
        return this._originalUsername;
    }

    set originalUsername(value: string) {
        this._originalUsername = value;
    }

    get emailAddress(): string {
        return this._emailAddress;
    }

    set emailAddress(value: string) {
        this._emailAddress = value;
    }

    get roles(): Array<string> {
        return this._roles;
    }

    set roles(value: Array<string>) {
        this._roles = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get passwordConfirmation(): string {
        return this._passwordConfirmation;
    }

    set passwordConfirmation(value: string) {
        this._passwordConfirmation = value;
    }

    get subscribed(): boolean {
        return this._subscribed;
    }

    set subscribed(value: boolean) {
        this._subscribed = value;
    }

    get twoFactorEnabled(): boolean {
        return this._twoFactorEnabled;
    }

    set twoFactorEnabled(value: boolean) {
        this._twoFactorEnabled = value;
    }
}
