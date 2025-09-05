import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMultiselect } from './custom-multiselect';

describe('CustomMultiselect', () => {
  let component: CustomMultiselect;
  let fixture: ComponentFixture<CustomMultiselect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomMultiselect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMultiselect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
