export class WebPage {

    constructor(private _html: string) {
    }


    get html(): string {
        return this._html;
    }

    set html(value: string) {
        this._html = value;
    }
}
