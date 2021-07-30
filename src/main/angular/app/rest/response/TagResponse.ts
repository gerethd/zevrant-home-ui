export class TagResponse {

    constructor(private _id: number, private _tag: string) {
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get tag(): string {
        return this._tag;
    }

    set tag(value: string) {
        this._tag = value;
    }
}
