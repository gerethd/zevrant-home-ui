import {ThingiverseHit} from "./ThingiverseHit";

export class ThingiverseSearchResponse {

    constructor(private _total: number, private _hits: Array<ThingiverseHit>) {

    }

    get total(): number {
        return this._total;
    }

    set total(value: number) {
        this._total = value;
    }

    get hits(): Array<ThingiverseHit> {
        return this._hits;
    }

    set hits(value: Array<ThingiverseHit>) {
        this._hits = value;
    }
}
