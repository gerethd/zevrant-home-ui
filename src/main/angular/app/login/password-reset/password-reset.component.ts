import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

    resetPassword: FormGroup = new FormGroup({
        username: new FormControl(this.password, [
            Validators.required,
        ]),
        password: new FormControl(this.password, [
            Validators.required,
            Validators.minLength(11)
        ]),
        passwordConfirmation: new FormControl(this.passwordConfirmation, [
            Validators.required,
            Validators.minLength(11)
        ]),
    });

    constructor(private loginService: LoginService, private router: Router, private snackBarService: SnackbarService) {
    }

    get username(): AbstractControl {
        if (this.resetPassword) {
            return this.resetPassword.get('username');
        }
        return null;
    }

    get password(): AbstractControl {
        if (this.resetPassword) {
            return this.resetPassword.get('password');
        }
        return null;
    }

    get passwordConfirmation(): AbstractControl {
        if (this.resetPassword) {
            return this.resetPassword.get('passwordConfirmation');
        }
        return null;
    }

    ngOnInit(): void {
    }

    onSubmit() {
        let token: string = this.router.url.split("/")[this.router.url.split("/").length - 1];
        this.loginService.resetPassword(token, this.password.value, this.passwordConfirmation.value, this.username.value).then(() => {
            this.snackBarService.displayMessage("Your password has been successfully updated", 10000);
            this.router.navigateByUrl("/login");
        });
    }

    isFilledOut() {
        return this.resetPassword.invalid;
    }
}
