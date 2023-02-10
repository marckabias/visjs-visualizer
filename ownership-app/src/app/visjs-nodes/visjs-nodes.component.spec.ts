import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisjsNodesComponent } from './visjs-nodes.component';

describe('VisjsNodesComponent', () => {
  let component: VisjsNodesComponent;
  let fixture: ComponentFixture<VisjsNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisjsNodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisjsNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
