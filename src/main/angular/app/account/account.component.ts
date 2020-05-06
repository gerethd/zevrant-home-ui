import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {LocalStorageService, StorageService} from "angular-web-storage";
import {Constants} from "../constants/Constants";
import {User} from "../rest/response/User";
import {BehaviorSubject} from "rxjs";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../services/snackbar.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  focus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  user: User = new User(null, null, null,null, null , null,null);
  subscribed = new BehaviorSubject<boolean>(true);
  userUpdateForm: FormGroup = new FormGroup({
    username: new FormControl(this.username, [
      Validators.required
    ]),
    password: new FormControl(this.password, []),
    passwordConfirmation: new FormControl(this.password, []),
    email: new FormControl(this.email, [
      Validators.required
    ])
  });
  private i = 0;

  constructor(private userService: UserService, private router: Router, private storage: LocalStorageService,
              private snackBarService: SnackbarService) { }

  ngOnInit(): void {
    this.userService.getUserByName(this.storage.get(Constants.username)).then((data) => {
       this.user = data;
       this.user.originalUsername = this.user.username;
       this.username.setValue(data.username);
       this.email.setValue(this.user.emailAddress);
       this.subscribed.next(this.user.subscribed);
    })
  }

  updateSubscription() {
    let temp = !this.user.subscribed;
    this.user.subscribed = temp;
    this.subscribed.next(temp);
  }

  get username(): AbstractControl {
    if(this.userUpdateForm){
      return this.userUpdateForm.get('username') ;
    }
    return null;
  }

  get password(): AbstractControl {
    if(this.userUpdateForm){
      return this.userUpdateForm.get('password') ;
    }
    return null;
  }

  get passwordConfirmation(): AbstractControl {
    if(this.userUpdateForm){
      return this.userUpdateForm.get('passwordConmfirmation') ;
    }
    return null;
  }

  get email(): AbstractControl {
    if(this.userUpdateForm){
      return this.userUpdateForm.get('email') ;
    }
    return null;
  }

  isEmpty() {
    return isNotNullOrUndefined(this.password)
      && isNotNullOrUndefined(this.passwordConfirmation)
      && (isNotNullOrUndefined(this.password.value)
      || isNotNullOrUndefined(this.passwordConfirmation.value)
      || (<string> this.password.value).length >= 0
      || (<string> this.passwordConfirmation.value).length >= 0);
  }

  submit() {
    this.userService.updateUserInfo(this.user).then(() => {
      this.router.navigate([""]);
      this.snackBarService.displayMessage("Account changes were successfully saved",  10000);
    }).catch((error) => {
      console.log(error)
      let errors = error.error.errors;
      if (isNotNullOrUndefined(errors)) {
        this.snackBarService.displayMessage(errors[0].field + " " + errors[0].defaultMessage, 10000);
      } else if(isNotNullOrUndefined(error.error)) {
        this.snackBarService.displayMessage(error.error.message,  10000);
      } else {
        this.snackBarService.displayMessage(error.message,  10000);
      }
    });
  }
}
