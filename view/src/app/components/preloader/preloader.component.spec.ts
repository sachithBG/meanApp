import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloderComponent } from './preloader.component';

describe('PreloaderComponent', () => {
  let component: PreloderComponent;
  let fixture: ComponentFixture<PreloderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
