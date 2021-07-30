import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {Component} from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({selector: 'app-nav-bar', template: ''})
class AppNavBarStubComponent {
}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatToolbarModule
            ],
            declarations: [
                AppComponent,
                AppNavBarStubComponent
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'zevrant-home-ui'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('zevrant-home-ui');
    });

});
