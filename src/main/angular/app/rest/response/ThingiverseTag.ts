export class ThingiverseTag {

    constructor(private _name: string, private _url: string, private _count: number, private _things_url: string, private _absolute_url: string) {
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    get count(): number {
        return this._count;
    }

    set count(value: number) {
        this._count = value;
    }

    get things_url(): string {
        return this._things_url;
    }

    set things_url(value: string) {
        this._things_url = value;
    }

    get absolute_url(): string {
        return this._absolute_url;
    }

    set absolute_url(value: string) {
        this._absolute_url = value;
    }
}
