export class LoginResponse {

    constructor(access_Token: string, expiresIn: number) {
        this._access_token = access_Token;
        this._expires_in = expiresIn;
    }

    private _access_token: string;

    get access_token(): string {
        return this._access_token;
    }

    set access_token(value: string) {
        this._access_token = value;
    }

    private _expires_in: number;

    get expires_in(): number {
        return this._expires_in;
    }

    set expires_in(value: number) {
        this._expires_in = value;
    }
}
