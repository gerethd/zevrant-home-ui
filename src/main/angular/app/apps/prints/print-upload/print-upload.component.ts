import {Component, OnChanges, OnInit} from '@angular/core';
import {PrintService} from "../../../services/print.service";
import {HttpService} from "../../../services/http.service";
import {Constants} from "../../../constants/Constants";
import {ModelService} from "../../../services/model.service";
import {TagService} from "../../../services/tag.service";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {SnackbarService} from "../../../services/snackbar.service";
import {Tag} from "./tag";
import {TagResponse} from "../../../rest/response/TagResponse";

@Component({
    selector: 'app-print-upload',
    templateUrl: './print-upload.component.html',
    styleUrls: ['./print-upload.component.scss']
})
export class PrintUploadComponent implements OnInit, OnChanges {
    files: File;
    fileSize;
    filesTouched: boolean = false;
    photo;
    tags = new BehaviorSubject<Array<Tag>>([new Tag(null, null)]);
    displayedColumns: string[] = ["tag", "checkbox"];
    searchTagForm: FormGroup = new FormGroup({
        tagSearch: new FormControl(this.tagSearch, [])
    });
    private loadingSubject = new BehaviorSubject<boolean>(false);
    isLoading: Observable<boolean> = this.loadingSubject.asObservable();
    private fileData: ArrayBuffer;
    private coverPhotos: File;
    private appliedTags: string[] = [];

    constructor(private http: HttpService, private printService: PrintService, private snackBar: SnackbarService,
                private modelService: ModelService, private tagService: TagService) {
        this.getTags(0, 5);
    }

    get tagSearch(): AbstractControl {
        if (this.searchTagForm) {
            return this.searchTagForm.get('tagSearch');
        }
        return null;
    }

    ngOnChanges() {
        this.searchTag()
    }

    ngOnInit() {
    }

    isValid() {
        return this.files && this.coverPhotos
    }

    submit() {
        this.loadingSubject.next(true);
        this.modelService.uploadModel(this.fileData, this.files.name, this.photo, this.appliedTags).then((data) => {
            this.files = null;
            this.filesTouched = false;
            this.coverPhotos = null;
            this.photo = null;
            this.fileSize = null;
            this.snackBar.displayMessage("Upload Successful!", 10000)
            this.modelService.uploadEmitter.emit("uploaded");
            this.appliedTags.forEach((tag) => {
                this.tags.getValue().forEach((tagObject) => {
                    if (tagObject.tag == tag) {
                        tagObject.isApplied.next(false);
                    }
                })
            });
            this.appliedTags = [];
        }).catch((err: any) => {
            this.snackBar.displayMessage(err.error.message, 10000);
        }).finally(() => {
            this.loadingSubject.next(false);
        });

    }

    fileUploadEvent($event) {
        this.files = $event.target.files[0];
        const reader: FileReader = new FileReader();
        reader.readAsArrayBuffer(this.files);
        reader.onload = (event) => {
            this.fileData = <ArrayBuffer>reader.result;
        };
        this.fileSize = this.files.size / 1024;
        this.filesTouched = true;
    }

    fileCoverPhotoUploadEvent($event) {
        this.coverPhotos = <File>$event.target.files[0];
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(this.coverPhotos);
        reader.onload = (event) => {
            this.photo = <ArrayBuffer>reader.result;
        };
    }

    async getTags(page: number, pageSize: number) {
        let tags: any = await this.http.get(Constants.modelBaseUrl + `tags/${page}/${pageSize}`, null);
        this.convertTags(tags.tags)
    }

    applyTag(tag: any) {
        let index: number = this.appliedTags.indexOf(tag.tag);
        if (index > -1) {
            this.appliedTags = this.appliedTags.splice(index, 1);
            tag.isApplied = false;
            return;
        }
        this.appliedTags.push(tag.tag);
        tag.isApplied = true;
    }

    async searchTag() {
        let temp: any = await this.tagService.searchTag(this.tagSearch.value);
        this.convertTags(temp.tags);
    }

    async addTag() {
        this.tagService.uploadTag(this.tagSearch.value).then(() => {
            this.searchTag();
        });
    }

    private convertTags(tags: Array<TagResponse>) {
        let newTags = [];
        tags.forEach((tag) => {
            newTags.push(new Tag(tag.tag, new BehaviorSubject<boolean>(this.appliedTags.indexOf(tag.tag) > -1)));
        });
        this.tags.next(newTags);
    }
}
