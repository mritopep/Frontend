import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgBase64Component } from './img-base64.component';

describe('ImgBase64Component', () => {
  let component: ImgBase64Component;
  let fixture: ComponentFixture<ImgBase64Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgBase64Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgBase64Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
