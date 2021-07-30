import {EventEmitter, Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Constants} from "../constants/Constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ModelResponse} from "../rest/response/ModelResponse";
import {LocalStorageService} from "angular-web-storage";

@Injectable({
    providedIn: 'root'
})
export class ModelService {

    public uploadEmitter: EventEmitter<string> = new EventEmitter<string>();

    constructor(private http: HttpService, private httpClient: HttpClient, private storage: LocalStorageService) {
    }

    uploadModel(fileContents: any, fileName: string, coverPhoto: any, appliedTags: string[]): Promise<String> {
        let formData: FormData = new FormData();
        formData.append("file", new Blob([fileContents]), 'file');
        formData.append("coverPhoto", new Blob([coverPhoto]), 'coverPhoto');
        let tags: string = "";

        for (let element of appliedTags) {
            tags += element.concat(",");
        }
        tags = tags.substr(0, tags.length - 1);
        let headers = new HttpHeaders()
            .append("tags", tags)
            .append("fileName", fileName);
        let response = this.http.post(Constants.modelBaseUrl + "models", headers, formData);
        this.uploadEmitter.emit("uploaded");
        return response;
    }

    convertTagString(tags: string) {
        let array: Array<string> = [];
        if (tags === "") {
            tags = null;
        }
        JSON.stringify(tags).split(",").forEach((tag) => {
            if (tag !== "null") {
                array.push(tag);
            } else {
                array.push("");
            }
        });
        return array;
    }

    searchModel(fileName: string, tags: Array<string>, modelSearchField: string, ascending: boolean,
                page: number, pageSize: number): Promise<ModelResponse> {
        let headers = new HttpHeaders()
            .set("tags", tags)
            .set("modelSearchField", modelSearchField)
            .set("ascending", JSON.stringify(ascending));
        return this.http.get(Constants.modelBaseUrl + `models/${fileName}/${page}/${pageSize}`, headers);
    }

    async getCoverPhoto(fileName: String): Promise<ArrayBuffer> {
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "image/jpeg");
        return await this.http.getBlob(`${Constants.modelBaseUrl}models/coverphoto/${fileName}`, headers).toPromise();
    }

    updateTags(fileName: string, tags: Array<string>) {
        let headers = new HttpHeaders().set("tags", tags);
        return this.http.put(Constants.modelBaseUrl + `models/${fileName}`, headers, null);
    }

    downloadModel(fileName: string, fileExtension: string): Promise<ArrayBuffer> {
        return this.http.getBlob(`${Constants.modelBaseUrl}models/${fileName}.${fileExtension}`, null).toPromise();
    }
}
