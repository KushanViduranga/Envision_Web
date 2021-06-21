import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAircraftLogComponent } from './list-aircraft-log.component';

describe('ListAircraftLogComponent', () => {
  let component: ListAircraftLogComponent;
  let fixture: ComponentFixture<ListAircraftLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAircraftLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAircraftLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
