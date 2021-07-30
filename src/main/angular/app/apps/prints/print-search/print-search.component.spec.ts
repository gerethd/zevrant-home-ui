import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrintSearchComponent} from './print-search.component';

describe('PrintSearchComponent', () => {
    let component: PrintSearchComponent;
    let fixture: ComponentFixture<PrintSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PrintSearchComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrintSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
