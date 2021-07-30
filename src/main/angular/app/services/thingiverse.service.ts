import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Constants} from "../constants/Constants";
import {ThingiverseSearchResponse} from "../rest/response/ThingiverseSearchResponse";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ThingiverseService {

    constructor(private http: HttpService) {

    }

    search(searchTerm: string, page: number, pageSize: number): Promise<ThingiverseSearchResponse> {
        return this.http.get(Constants.outsourceBaseUrl + `thingiverse/search/${searchTerm}/${page}/${pageSize}`, null);
    }

    getCoverPhoto(thumbnail: string) {
        let headers: HttpHeaders = new HttpHeaders();
        headers.set("url", thumbnail);
        return this.http.getBlob(Constants.outsourceBaseUrl + "thingiverse/photo/", headers);
    }
}
