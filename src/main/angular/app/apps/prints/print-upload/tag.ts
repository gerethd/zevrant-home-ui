import {BehaviorSubject} from "rxjs";

export class Tag {
    constructor(private _tag: string, private _isApplied: BehaviorSubject<boolean>) {
    }


    get tag(): string {
        return this._tag;
    }

    set tag(value: string) {
        this._tag = value;
    }

    get isApplied(): BehaviorSubject<boolean> {
        return this._isApplied;
    }

    set isApplied(value: BehaviorSubject<boolean>) {
        this._isApplied = value;
    }
}
