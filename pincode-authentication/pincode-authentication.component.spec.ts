import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodeAuthenticationComponent } from './pincode-authentication.component';

describe('PincodeAuthenticationComponent', () => {
  let component: PincodeAuthenticationComponent;
  let fixture: ComponentFixture<PincodeAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PincodeAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PincodeAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
