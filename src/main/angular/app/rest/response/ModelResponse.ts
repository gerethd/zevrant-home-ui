import {Model} from "./Model";

export class ModelResponse {


    constructor(private _models: Array<Model>, private _totalRows: number) {
    }

    get models(): Array<Model> {
        return this._models;
    }

    set models(value: Array<Model>) {
        this._models = value;
    }

    get totalRows(): number {
        return this._totalRows;
    }

    set totalRows(value: number) {
        this._totalRows = value;
    }
}
