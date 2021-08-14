import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPincodeComponent } from './error-pincode.component';

describe('ErrorPincodeComponent', () => {
  let component: ErrorPincodeComponent;
  let fixture: ComponentFixture<ErrorPincodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorPincodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
