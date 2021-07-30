export class ThingiverseCreator {

    private constructor(private _id: string, private _name: string, private _url: string, private _thumbnail: string, private _lovcation: string,
                        private _cover: string, private _following: boolean, private _first_name: string, private _last_name: string,
                        private _public_url: string, private _count_of_followers: number, private _count_of_following: number,
                        private _count_of_designs: number, private _is_following: boolean) {

    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
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

    get thumbnail(): string {
        return this._thumbnail;
    }

    set thumbnail(value: string) {
        this._thumbnail = value;
    }

    get lovcation(): string {
        return this._lovcation;
    }

    set lovcation(value: string) {
        this._lovcation = value;
    }

    get cover(): string {
        return this._cover;
    }

    set cover(value: string) {
        this._cover = value;
    }

    get following(): boolean {
        return this._following;
    }

    set following(value: boolean) {
        this._following = value;
    }

    get first_name(): string {
        return this._first_name;
    }

    set first_name(value: string) {
        this._first_name = value;
    }

    get last_name(): string {
        return this._last_name;
    }

    set last_name(value: string) {
        this._last_name = value;
    }

    get public_url(): string {
        return this._public_url;
    }

    set public_url(value: string) {
        this._public_url = value;
    }

    get count_of_followers(): number {
        return this._count_of_followers;
    }

    set count_of_followers(value: number) {
        this._count_of_followers = value;
    }

    get count_of_following(): number {
        return this._count_of_following;
    }

    set count_of_following(value: number) {
        this._count_of_following = value;
    }

    get count_of_designs(): number {
        return this._count_of_designs;
    }

    set count_of_designs(value: number) {
        this._count_of_designs = value;
    }

    get is_following(): boolean {
        return this._is_following;
    }

    set is_following(value: boolean) {
        this._is_following = value;
    }

}
