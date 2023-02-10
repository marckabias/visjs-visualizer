import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeEdgeVisualizerComponent } from './node-edge-visualizer.component';

describe('NodeEdgeVisualizerComponent', () => {
  let component: NodeEdgeVisualizerComponent;
  let fixture: ComponentFixture<NodeEdgeVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeEdgeVisualizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeEdgeVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
