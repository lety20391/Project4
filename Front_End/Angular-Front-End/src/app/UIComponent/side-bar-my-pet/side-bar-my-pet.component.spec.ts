import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarMyPetComponent } from './side-bar-my-pet.component';

describe('SideBarMyPetComponent', () => {
  let component: SideBarMyPetComponent;
  let fixture: ComponentFixture<SideBarMyPetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarMyPetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarMyPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
