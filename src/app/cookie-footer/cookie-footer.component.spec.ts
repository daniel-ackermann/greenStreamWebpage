import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieFooterComponent } from './cookie-footer.component';

describe('CookieFooterComponent', () => {
  let component: CookieFooterComponent;
  let fixture: ComponentFixture<CookieFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookieFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
