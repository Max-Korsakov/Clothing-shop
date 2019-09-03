import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritComponent } from './favourit.component';

describe('FavouritComponent', () => {
  let component: FavouritComponent;
  let fixture: ComponentFixture<FavouritComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
