import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportJSONComponent } from './import-json.component';

describe('ImportJSONComponent', () => {
  let component: ImportJSONComponent;
  let fixture: ComponentFixture<ImportJSONComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportJSONComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportJSONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
