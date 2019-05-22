import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTablePetImgComponent } from './smart-table-pet-img.component';

describe('SmartTablePetImgComponent', () => {
  let component: SmartTablePetImgComponent;
  let fixture: ComponentFixture<SmartTablePetImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartTablePetImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTablePetImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
