import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login/login.component';

import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { Oauth2AuthService } from './auth/oauth2-auth.service';

const mockOauth2AuthService = {
  isAuthenticated: jest.fn()
}

describe('App Component', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes([])],
        providers: [{provide: Oauth2AuthService, useValue: mockOauth2AuthService}]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should have appName', () => {
      // WHEN
      fixture.detectChanges();

      // THEN
      expect(comp.appName).toEqual('baby');
    });
    
    it('should display login component', () => {
      mockOauth2AuthService.isAuthenticated.mockImplementation(() => of(false));
      fixture.detectChanges();
    
      expect(fixture.debugElement.query(By.directive(LoginComponent))).toBeTruthy();
    });

  });

});
