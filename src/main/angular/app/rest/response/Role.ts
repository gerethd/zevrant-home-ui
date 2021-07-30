export class Role {

    constructor(private _role: string, private _isApplied: boolean) {
    }


    get role(): string {
        return this._role;
    }

    set role(value: string) {
        this._role = value;
    }

    get isApplied(): boolean {
        return this._isApplied;
    }

    set isApplied(value: boolean) {
        this._isApplied = value;
    }
}
