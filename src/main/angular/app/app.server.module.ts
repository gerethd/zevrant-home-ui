import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {HTTP_INTERCEPTORS} from '@angular/common/http';


import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {UniversalInterceptor} from './universal-interceptor';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        ModuleMapLoaderModule,
        MatMenuModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: UniversalInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent],
})
export class AppServerModule {
}
