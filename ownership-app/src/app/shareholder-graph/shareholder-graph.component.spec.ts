import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareholderGraphComponent } from './shareholder-graph.component';

describe('ShareholderGraphComponent', () => {
  let component: ShareholderGraphComponent;
  let fixture: ComponentFixture<ShareholderGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareholderGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareholderGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
