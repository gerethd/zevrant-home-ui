import {TestBed} from '@angular/core/testing';

import {LoginService} from './login.service';
import {HttpClient} from "@angular/common/http";

describe('LoginServiceService', () => {
    const http = jasmine.createSpyObj('HttpClient', ['post']);

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            LoginService,
            {provide: HttpClient, useValue: http}
        ]
    }));


    it('should be created', () => {
        const service: LoginService = TestBed.get(LoginService);
        expect(service).toBeTruthy();
    });
});
