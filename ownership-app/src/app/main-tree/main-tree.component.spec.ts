import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTreeComponent } from './main-tree.component';

describe('MainTreeComponent', () => {
  let component: MainTreeComponent;
  let fixture: ComponentFixture<MainTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
