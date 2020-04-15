import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LocalStorageService} from "angular-web-storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(this.username, [
      Validators.required,
    ]),
    password: new FormControl(this.password, [
      Validators.required,
    ])
  });

  private subscription: any;

  constructor(private loginService: LoginService, private storage: LocalStorageService,
              private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.subscription = this.loginService.getLoginEmitter().subscribe((event) => {
      this.router.navigate([""])
    })
  }

  onSubmit() {
    this.loginService.login(this.username.value, this.password.value).catch((error: any) => {
      this.snackBar.open(error.error.message);
      new Promise( resolve => setTimeout(resolve, 10000) ).then(() => {
        this.snackBar.dismiss();
      });
    });

  }

  get username(): AbstractControl {
    if(this.loginForm){
      return this.loginForm.get('username') ;
    }
    return null;
  }

  get password(): AbstractControl {
    if(this.loginForm) {
      return this.loginForm.get('password');
    }
    return null;
  }

}
