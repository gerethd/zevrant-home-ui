import {ThingiverseTag} from "./ThingiverseTag";

export class ThingiverseHit {

    constructor(private _id: number, private _name: string, private _createdAt: any, private _thumbnail: string, private _previewImage: any, private _tags: Array<ThingiverseTag>,
                private _purchased: boolean, private _published: boolean, private _nsfw: boolean, private _public_url: string, private _is_private: boolean,
                private _is_purchased: boolean, private _is_published: boolean, private _comment_count: number, private _like_count: number, private _is_nsfw: boolean) {
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get createdAt(): any {
        return this._createdAt;
    }

    set createdAt(value: any) {
        this._createdAt = value;
    }

    get thumbnail(): string {
        return this._thumbnail;
    }

    set thumbnail(value: string) {
        this._thumbnail = value;
    }

    get previewImage(): any {
        return this._previewImage;
    }

    set previewImage(value: any) {
        this._previewImage = value;
    }

    get tags(): Array<ThingiverseTag> {
        return this._tags;
    }

    set tags(value: Array<ThingiverseTag>) {
        this._tags = value;
    }

    get purchased(): boolean {
        return this._purchased;
    }

    set purchased(value: boolean) {
        this._purchased = value;
    }

    get published(): boolean {
        return this._published;
    }

    set published(value: boolean) {
        this._published = value;
    }

    get nsfw(): boolean {
        return this._nsfw;
    }

    set nsfw(value: boolean) {
        this._nsfw = value;
    }

    get public_url(): string {
        return this._public_url;
    }

    set public_url(value: string) {
        this._public_url = value;
    }

    get is_private(): boolean {
        return this._is_private;
    }

    set is_private(value: boolean) {
        this._is_private = value;
    }

    get is_purchased(): boolean {
        return this._is_purchased;
    }

    set is_purchased(value: boolean) {
        this._is_purchased = value;
    }

    get is_published(): boolean {
        return this._is_published;
    }

    set is_published(value: boolean) {
        this._is_published = value;
    }

    get comment_count(): number {
        return this._comment_count;
    }

    set comment_count(value: number) {
        this._comment_count = value;
    }

    get like_count(): number {
        return this._like_count;
    }

    set like_count(value: number) {
        this._like_count = value;
    }

    get is_nsfw(): boolean {
        return this._is_nsfw;
    }

    set is_nsfw(value: boolean) {
        this._is_nsfw = value;
    }
}
