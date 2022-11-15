import { By } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('App Component', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes([])],
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
      fixture.detectChanges();
    
      expect(fixture.debugElement.query(By.directive(LoginComponent))).toBeTruthy();
    });

  });

});
