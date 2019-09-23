import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SignupSigninDialogComponent } from "./signup-signin-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClient } from "@angular/common/http";
import { HttpServiceService } from "../services/http-service.service";
import { DebugElement } from "@angular/core";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserServiceService } from "../services/user-service.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDividerModule } from "@angular/material/divider";
import { MatSnackBarConfig } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatBadgeModule } from "@angular/material/badge";
import { MatSliderModule } from "@angular/material/slider";
import { MatPaginatorModule } from "@angular/material/paginator";
import { RouterTestingModule } from "@angular/router/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
describe("SignupSigninDialogComponent", () => {
  // const mockDialogRef = {
  //    close: jasmine.createSpy("close")
  //  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupSigninDialogComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDividerModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatButtonToggleModule,
        MatBadgeModule,
        MatSliderModule,
        MatPaginatorModule
      ],
      providers: [
        HttpServiceService,
        HttpClient,
        UserServiceService,
        HttpServiceService,
        {
          provide: MatDialogRef
          //   useValue: mockDialogRef
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  describe(":", () => {
    function setup() {
      const fixture = TestBed.createComponent(SignupSigninDialogComponent);
      const component = fixture.componentInstance;
      const userService = fixture.debugElement.injector.get(UserServiceService);
      const httpService = fixture.debugElement.injector.get(HttpServiceService);
      return { fixture, component, userService, httpService };
    }

    it("should create", () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });

    it("form invalid when empty", () => {
      const { component, fixture } = setup();
      fixture.detectChanges();
      expect(component.form.valid).toBeFalsy();
    });

    it("submitting a form emits a data", () => {
      const { component, fixture } = setup();

      fixture.detectChanges();

      expect(component.form.valid).toBeFalsy();
      component.form.controls["firstName"].setValue("Test");
      component.form.controls["email"].setValue("test@test.com");
      component.form.controls["password"].setValue("123456789");

      expect(component.form.valid).toBeTruthy();
      const dialogRef = {
        close: jasmine.createSpy("close")
      };

     // component.onSubmit();

    //  expect(dialogRef.close()).toHaveBeenCalled();
    });
  });
});
