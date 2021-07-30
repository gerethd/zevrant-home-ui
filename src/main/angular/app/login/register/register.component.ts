import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {regexValidator} from "../../directives/regex-validator.directive";
import {Router} from "@angular/router";
import {Role} from "../../rest/response/Role";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../../services/user.service";
import {MatPaginator} from "@angular/material/paginator";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
    registerForm: FormGroup = new FormGroup({
        username: new FormControl(this.username, [
            Validators.required,
            Validators.minLength(3),
            regexValidator(/([a-z][A-Z])+/)
        ]),
        password: new FormControl(this.password, [
            Validators.required,
            Validators.minLength(10),
        ]),
        fullName: new FormControl(this.fullName, [
            Validators.required,
            Validators.minLength(6),
            regexValidator(/([a-z][A-Z])+ ([a-z][A-Z])+/)
        ])
    });
    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    userRoles = new BehaviorSubject<Array<Role>>([]);
    displayedColumns = ["Desired Role", "Is Applied"];
    totalRows: number;
    private config;
    private appliedRoles: string[] = [];

    constructor(private http: HttpClient, private router: Router, private userService: UserService, private snackBarService: SnackbarService,
                private changeDetectorRef: ChangeDetectorRef) {

    }

    get username(): AbstractControl {
        if (this.registerForm) {
            return this.registerForm.get('username');
        }
        return null;
    }

    get password(): AbstractControl {
        if (this.registerForm) {
            return this.registerForm.get('password');
        }
        return null;
    }

    get fullName(): AbstractControl {
        if (this.registerForm) {
            return this.registerForm.get('fullName');
        }
        return null;
    }

    ngOnInit(): void {
        this.roleSearch(0, 4);
    }

    ngAfterViewInit() {
        this.paginator.page.subscribe((event) => this.roleSearch(this.paginator.pageIndex, this.paginator.pageSize));
    }

    onSubmit() {
        let message = {
            "clientId": this.registerForm.get("username").value,
            "clientSecret": this.registerForm.get("password").value,
            "fullName": this.registerForm.get("fullName").value,
            "roles": this.appliedRoles
        };
        this.http.post("zevrant-oauth2-service/register", message).toPromise()
            .then((data: any) => {
                this.router.navigateByUrl("");
            }).catch((error) => {
            this.snackBarService.displayMessage("The chosen username has already been taken, please choose another and try again.", 10000);
        });
    }

    applyRole(role: Role) {
        let index: number = this.appliedRoles.indexOf(role.role);
        if (index > -1) {
            delete this.appliedRoles[index];
            role.isApplied = false;
        } else {
            this.appliedRoles.push(role.role);
            role.isApplied = true;
        }
    }

    async roleSearch(page, pageSize) {
        this.userService.searchRoles(page, pageSize).then(data => {
            let dataRoles: Array<Role> = [];
            for (let role in data.roles) {
                dataRoles.push(new Role(data.roles[role], false));
            }
            this.userRoles.next(dataRoles);
            this.userRoles.getValue().forEach(role => {
                if (this.appliedRoles.indexOf(role.role) >= 0) {
                    role.isApplied = true;
                }
            })
            this.totalRows = data.totalRoles;
        });
    }

    containsRole(role: Role) {
        return role.isApplied;
    }
}
