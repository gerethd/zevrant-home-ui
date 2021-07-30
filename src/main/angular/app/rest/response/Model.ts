import {BehaviorSubject} from "rxjs";

export class Model {
    constructor(private _fileName: string, private _coverPhoto: any, private _fileExtension: string,
                private _tags: Array<string>) {
    }

    private _isTagsSelected: BehaviorSubject<boolean>

    get isTagsSelected(): BehaviorSubject<boolean> {
        return this._isTagsSelected;
    }

    set isTagsSelected(value: BehaviorSubject<boolean>) {
        this._isTagsSelected = value;
    }

    private _id: number;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    private _url: string;

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    private _fileUrl: string;

    get fileUrl(): string {
        return this._fileUrl;
    }

    set fileUrl(value: string) {
        this._fileUrl = value;
    }

    get fileName(): string {
        return this._fileName;
    }

    set fileName(value: string) {
        this._fileName = value;
    }

    get coverPhoto(): any {
        return this._coverPhoto;
    }

    set coverPhoto(value: any) {
        this._coverPhoto = value;
    }

    get tags(): Array<string> {
        return this._tags;
    }

    set tags(value: Array<string>) {
        this._tags = value;
    }

    get fileExtension(): string {
        return this._fileExtension;
    }

    set fileExtension(value: string) {
        this._fileExtension = value;
    }
}
