import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NavBarComponent} from './nav-bar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {StorageServiceModule} from "angular-webstorage-service";
import {HttpClientModule} from "@angular/common/http";

describe('NavBarComponent', () => {
    let component: NavBarComponent;
    let fixture: ComponentFixture<NavBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavBarComponent],
            imports: [
                MatMenuModule,
                MatToolbarModule,
                StorageServiceModule,
                HttpClientModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
