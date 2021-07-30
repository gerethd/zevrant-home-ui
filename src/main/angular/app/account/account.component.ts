import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {LocalStorageService} from "angular-web-storage";
import {Constants} from "../constants/Constants";
import {User} from "../rest/response/User";
import {BehaviorSubject} from "rxjs";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {Router} from "@angular/router";
import {SnackbarService} from "../services/snackbar.service";
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";

let twoFactorCode = null;

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    focus: BehaviorSubject<boolean> = new BehaviorSubject(false);
    user: User = new User(null, null, null, null, null, null, null, null);
    subscribed = new BehaviorSubject<boolean>(true);
    twoFactorEnabled = new BehaviorSubject<boolean>(false);
    userUpdateForm: FormGroup = new FormGroup({
        username: new FormControl(this.username, [
            Validators.required
        ]),
        password: new FormControl(this.password, [
            Validators.minLength(11)
        ]),
        passwordConfirmation: new FormControl(this.password, [
            Validators.minLength(11)
        ]),
        email: new FormControl(this.email, [
            Validators.required
        ])
    });
    private i = 0;

    constructor(private userService: UserService, private router: Router, private storage: LocalStorageService,
                private snackBarService: SnackbarService, private bottomSheet: MatBottomSheet) {
    }

    get username(): AbstractControl {
        if (this.userUpdateForm) {
            return this.userUpdateForm.get('username');
        }
        return null;
    }

    get password(): AbstractControl {
        if (this.userUpdateForm) {
            return this.userUpdateForm.get('password');
        }
        return null;
    }

    get passwordConfirmation(): AbstractControl {
        if (this.userUpdateForm) {
            return this.userUpdateForm.get('passwordConmfirmation');
        }
        return null;
    }

    get email(): AbstractControl {
        if (this.userUpdateForm) {
            return this.userUpdateForm.get('email');
        }
        return null;
    }

    ngOnInit(): void {
        this.userService.getUserByName(this.storage.get(Constants.username)).then((data) => {
            this.user = data;
            this.user.originalUsername = this.user.username;
            this.username.setValue(data.username);
            this.email.setValue(this.user.emailAddress);
            this.subscribed.next(this.user.subscribed);
            this.twoFactorEnabled.next(this.user.twoFactorEnabled)
        })
    }

    updateSubscription() {
        let temp = !this.user.subscribed;
        this.user.subscribed = temp;
        this.subscribed.next(temp);
    }

    isEmpty() {
        return isNotNullOrUndefined(this.password)
            && isNotNullOrUndefined(this.passwordConfirmation)
            && (isNotNullOrUndefined(this.password.value)
                || isNotNullOrUndefined(this.passwordConfirmation.value)
                || (<string>this.password.value).length >= 0
                || (<string>this.passwordConfirmation.value).length >= 0);
    }

    submit() {
        this.userService.updateUserInfo(this.user).then((data) => {
            if (data.twoFactorSecret) {
                twoFactorCode = data.twoFactorSecret;
                this.bottomSheet.open(BottomSheetOverviewSheet);
            } else {
                this.router.navigate([""]);
                this.snackBarService.displayMessage("Account changes were successfully saved", 10000);
            }
        }).catch((error) => {
            console.error(error)
            let errors = error.error.errors;
            if (isNotNullOrUndefined(errors)) {
                this.snackBarService.displayMessage(errors[0].field + " " + errors[0].defaultMessage, 10000);
            } else if (isNotNullOrUndefined(error.error)) {
                this.snackBarService.displayMessage(error.error.message, 10000);
            } else {
                this.snackBarService.displayMessage(error.message, 10000);
            }
        });
    }

    enableTwoFactor() {
        this.twoFactorEnabled.next(true);
        this.user.twoFactorEnabled = true
    }
}

@Component({
    selector: 'bottom-sheet-overview-example-sheet',
    templateUrl: 'bottom-sheet-overview-sheet.html',
})
export class BottomSheetOverviewSheet {
    twoFactorCode = "otpauth://totp/zevrant-services?secret=" + twoFactorCode;

    constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewSheet>, private router: Router) {
        this._bottomSheetRef.afterDismissed().toPromise().then(() => {
            this.router.navigate([""]);
        })
    }


}
