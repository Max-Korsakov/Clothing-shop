import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MaterialDialogComponent } from './material-dialog.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from '@angular/material/dialog';
describe('MaterialDialogComponent', () => {
  let component: MaterialDialogComponent;
  let fixture: ComponentFixture<MaterialDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),

  };
  const MAT_DATA = {}
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialDialogComponent ],
      imports: [ BrowserAnimationsModule, MatDialogModule],
      providers: [
        
          { provide: MAT_DIALOG_DATA, useValue: MAT_DATA },
          { provide: MatDialogRef, useValue: mockDialogRef }
        
      ]
 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
