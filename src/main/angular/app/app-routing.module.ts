import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./login/register/register.component";
import {HomeViewComponent} from "./apps/home/home-view/home-view.component";
import {PrintsComponent} from "./apps/prints/prints.component";
import {AdminComponent} from "./admin/admin.component";
import {AccountComponent} from "./account/account.component";
import {ForgotPasswordComponent} from "./login/forgot-password/forgot-password.component";
import {PasswordResetComponent} from "./login/password-reset/password-reset.component";
import {CameraViewComponent} from "./apps/camera/camera-view/camera-view.component";


const routes: Routes = [
    {path: '', component: HomeViewComponent},
    {path: 'login', component: LoginComponent},
    {path: 'login/register', component: RegisterComponent},
    {path: 'prints/:token', component: PrintsComponent},
    {path: 'prints', component: PrintsComponent},
    {path: 'camera', component: CameraViewComponent},
    {path: 'administration', component: AdminComponent},
    {path: 'account', component: AccountComponent},
    {path: 'login/forgot-password', component: ForgotPasswordComponent},
    {path: 'login/password-reset/:token', component: PasswordResetComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
