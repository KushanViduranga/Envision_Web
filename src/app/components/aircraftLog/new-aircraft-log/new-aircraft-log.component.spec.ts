import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAircraftLogComponent } from './new-aircraft-log.component';

describe('NewAircraftLogComponent', () => {
  let component: NewAircraftLogComponent;
  let fixture: ComponentFixture<NewAircraftLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAircraftLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAircraftLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
