export class RoleResponse {

    constructor(private _totalRoles: number, private _roles: Array<string>) {

    }

    get totalRoles(): number {
        return this._totalRoles;
    }

    set totalRoles(value: number) {
        this._totalRoles = value;
    }

    get roles(): Array<string> {
        return this._roles;
    }

    set roles(value: Array<string>) {
        this._roles = value;
    }
}
