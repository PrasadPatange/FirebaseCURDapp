import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Customerlist1Component } from './customerlist1.component';

describe('Customerlist1Component', () => {
  let component: Customerlist1Component;
  let fixture: ComponentFixture<Customerlist1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Customerlist1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Customerlist1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
