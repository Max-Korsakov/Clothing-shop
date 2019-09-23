import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SiteLayoutComponent } from "./site-layout.component";
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

import { of } from "rxjs";
import { User } from "../models";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
describe("SiteLayoutComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SiteLayoutComponent],
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
        MatPaginatorModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpServiceService,
        HttpClient,
        UserServiceService,
        HttpServiceService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  describe(":", () => {
    function setup() {
      const fixture = TestBed.createComponent(SiteLayoutComponent);
      const component = fixture.componentInstance;
      const userService = fixture.debugElement.injector.get(UserServiceService);
      const httpService = fixture.debugElement.injector.get(HttpServiceService);
      return { fixture, component, userService, httpService };
    }

    it("should create", () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });

    it("searchData should trim data and sent it to service", () => {
      const { component, fixture, httpService } = setup();
      fixture.detectChanges();
      component.searchData = "   Za   ";
      spyOn(httpService, "searchItems").and.returnValue(of("Zara"));
      component.inputChanged();
      expect(httpService.searchItems).toHaveBeenCalledWith("Za");
    });

    it("search should view results", () => {
      const { fixture, component, httpService } = setup();

      component.searchData = "Z";
      component.searchBrands = ["Zara"];
      fixture.detectChanges();
      const infoMessageEl: HTMLElement = fixture.debugElement.nativeElement;
      const nodeList = infoMessageEl.querySelectorAll(
        ".menu__search-form-result"
      );
      const nodeArray = Array.from(nodeList);
      let resultField = nodeArray[0];

      expect(resultField).toBeTruthy();
      expect(
        resultField.querySelector(".menu__search-form-result-brand-item")
          .innerHTML
      ).toBe("Zara");
      expect(
        resultField.querySelector(".menu__search-form-result-nofound").innerHTML
      ).toBe("Nothing was found");
    });

    it("search should not view pop up if there no data in input", () => {
      const { fixture, component, httpService } = setup();

      component.searchData = null;
      fixture.detectChanges();
      const infoMessageEl: HTMLElement = fixture.debugElement.nativeElement;
      const nodeList = infoMessageEl.querySelectorAll(
        ".menu__search-form-result"
      );
      const nodeArray = Array.from(nodeList);
      let resultField = nodeArray[0];

      expect(resultField).toBeFalsy();
     
    });
  });
});
