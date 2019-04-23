import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetMockupComponent } from './pet-mockup.component';

describe('PetMockupComponent', () => {
  let component: PetMockupComponent;
  let fixture: ComponentFixture<PetMockupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetMockupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetMockupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
