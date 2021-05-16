import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanviewerComponent } from './scanviewer.component';

describe('ScanviewerComponent', () => {
  let component: ScanviewerComponent;
  let fixture: ComponentFixture<ScanviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
