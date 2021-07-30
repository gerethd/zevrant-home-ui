import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {ModelService} from "../../../services/model.service";
import {Model} from "../../../rest/response/Model";
import {MatPaginator} from "@angular/material/paginator";
import {SnackbarService} from "../../../services/snackbar.service";
import {BehaviorSubject} from "rxjs";
import {ThingiverseService} from "../../../services/thingiverse.service";
import {CultsService} from "../../../services/cults.service";

class ModelSearchField {
    public static MODEL_NAME: string = "MODEL_NAME";
    public static TAG_NAME: string = "TAG_NAME"
}

@Component({
    selector: 'app-print-search',
    templateUrl: './print-search.component.html',
    styleUrls: ['./print-search.component.scss']
})
export class PrintSearchComponent implements OnInit, AfterViewInit {
    searchData: Array<Model>;
    totalRows: number;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    searchModelForm: FormGroup = new FormGroup({
        modelSearch: new FormControl(this.modelSearch, []),
        tagSearch: new FormControl(this.tagSearch, []),
        source: new FormControl(this.source, [])
    });
    sources = ["Thingiverse", "Cults"];
    thingverseLogin;
    isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private assetToken: string;

    constructor(private modelService: ModelService, private snackBarService: SnackbarService,
                private thingiverseService: ThingiverseService, private cultsService: CultsService) {
    }

    get tagSearch(): AbstractControl {
        if (this.searchModelForm) {
            return this.searchModelForm.get('tagSearch');
        }
        return null;
    }

    get modelSearch(): AbstractControl {
        if (this.searchModelForm) {
            return this.searchModelForm.get('modelSearch');
        }
        return null;
    }

    get source(): AbstractControl {
        if (this.searchModelForm) {
            return this.searchModelForm.get('source');
        }
        return null;
    }

    ngOnInit() {
        this.searchModel(0, 20);
        // this.assetToken = this.router.
    }

    ngAfterViewInit(): void {
        this.paginator.page.subscribe((event) => this.paginatorSearch());
        this.modelService.uploadEmitter.subscribe((event) => this.paginatorSearch())
    }

    async paginatorSearch() {
        this.isLoading.next(true);
        await this.searchModel(this.paginator.pageIndex, this.paginator.pageSize);
        this.isLoading.next(false);
    }

    async searchModel(page: number, pageSize: number) {
        let array = this.modelService.convertTagString(this.tagSearch.value);
        let modelName: string = this.modelSearch.value;
        if (modelName === "") {
            modelName = null;
        }
        switch (this.source.value) {
            case "Thingiverse": {
                await this.thingiverseSearch(page, pageSize);
                if (this.searchData.length == 0) {
                    this.snackBarService.displayMessage("No search results found for '" + modelName + "'.", 10000)
                }
                return;
            }
            case "Cults": {
                await this.cultsSearch(page);
                if (this.searchData.length == 0) {
                    this.snackBarService.displayMessage("No search results found for '" + modelName + "'.", 10000)
                }
                return;
            }
        }
        await this.modelService.searchModel(modelName, array, ModelSearchField.MODEL_NAME, true, page, pageSize)
            .then((data) => {
                data.models.forEach((model) => {
                    let fileName = model.fileName.split("/");
                    let fileBreakup = fileName[fileName.length - 1].split(".");
                    model.fileName = fileBreakup[0];
                    model.fileExtension = fileBreakup[fileBreakup.length - 1];
                    model.isTagsSelected = new BehaviorSubject<boolean>(false);
                    this.searchModelForm.addControl(model.fileName, new FormControl())
                });
                this.searchData = data.models;
                this.totalRows = data.totalRows;
            }).catch((err) => {
                this.snackBarService.displayMessage(err.error.message, 10000);
            })
    }

    async getCoverPhoto(model: Model) {
        if (this.source.value === "Thingiverse" || this.source.value === "Cults") {
            return model.coverPhoto;
        }
        if (model.coverPhoto === null) {
            let blob: ArrayBuffer = await this.modelService.getCoverPhoto(model.fileName + `.${model.fileExtension}`);
            let array = new Uint8Array(blob);
            model.coverPhoto = String.fromCharCode.apply(null, array);
        }
    }

    async download(currentModel: Model) {
        let element = document.getElementById("download");
        let source = this.source.value
        if (this.sources.indexOf(source) >= 0) {
            window.location.href = currentModel.url;
        } else {
            this.modelService.downloadModel(currentModel.fileName, currentModel.fileExtension).then((byteArray) => {
                let blob = new Blob([byteArray], {type: 'application/octet-stream'});
                const a = document.createElement('a');
                const objectUrl = URL.createObjectURL(blob);
                a.href = objectUrl;
                a.download = `${currentModel.fileName}.${currentModel.fileExtension}`
                a.click();
                URL.revokeObjectURL(objectUrl);
            });
        }
    }

    updateTags(model: Model) {
        this.modelService.updateTags(model.fileName, model.tags);
    }

    async thingiverseSearch(page: number, pageSize: number) {
        let searchValue: string = this.modelSearch.value;
        if (searchValue === null || searchValue === "") {
            searchValue = ' ';
        }
        await this.thingiverseService.search(searchValue, page + 1, pageSize).then((data) => {
            this.searchData = [];
            data.hits.forEach((dataPoint) => {
                this.totalRows = data.total;
                let tags: Array<string> = [];
                for (let j = 0; j < dataPoint.tags.length; j++) {
                    tags.push(dataPoint.tags[j].name);
                }
                let model: Model = new Model(dataPoint.name, dataPoint.thumbnail, null, tags);
                model.url = dataPoint.public_url;
                this.searchData.push(model);
                this.searchModelForm.addControl(model.fileName, new FormControl())
            });
        }).catch((error) => {
            console.error(error);
            this.snackBarService.displayMessage(error.message, 10000);
        }).finally(() => {
            this.isLoading.next(false);
        })
    }

    async cultsSearch(page: number) {
        let searchValue: string = this.modelSearch.value;
        if (searchValue === null || searchValue === "") {
            searchValue = ' ';
        }

        await this.cultsService.searchModel(searchValue, page + 1).then(data => {
            this.searchData = data.models;
            this.totalRows = data.totalRows;
            this.searchData.forEach((model) => this.searchModelForm.addControl(model.fileName, new FormControl()))
        }).catch(() => {
            this.snackBarService.displayMessage("We are currently processing your request try again in a few minutes.", 10000);
        }).finally(() => {
            this.isLoading.next(false);
        });
    }

}
