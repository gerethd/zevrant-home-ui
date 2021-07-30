import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Constants} from "../constants/Constants";
import {ModelResponse} from "../rest/response/ModelResponse";

@Injectable({
    providedIn: 'root'
})
export class CultsService {

    constructor(private http: HttpService) {
    }

    searchModel(searchValue: string, page: number): Promise<ModelResponse> {
        return this.http.get(Constants.outsourceBaseUrl + `cults/search/${searchValue}/${page}`, null);
    }

}
