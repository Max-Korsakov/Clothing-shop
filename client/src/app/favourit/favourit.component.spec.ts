import {
  async,
  tick,
  ComponentFixture,
  fakeAsync,
  TestBed
} from "@angular/core/testing";
import { FavouritComponent } from "./favourit.component";
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
import { Observable, Observer } from "rxjs";
import { CatalogComponent} from '../catalog/catalog.component'
describe("FavouritComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavouritComponent, CatalogComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'catalog', component: CatalogComponent}
      ]),
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
        HttpServiceService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  describe(":", () => {
    function setup() {
      const fixture = TestBed.createComponent(FavouritComponent);
      const component = fixture.componentInstance;
      const userService = fixture.debugElement.injector.get(UserServiceService);
      const httpService = fixture.debugElement.injector.get(HttpServiceService);
      return { fixture, component, userService, httpService };
    }

    it("should create", () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });

    it("openItemDetails should redirect to catalog with id params", () => {
      const { component } = setup();  
      spyOn(component.router, 'navigate')
      component.openItemDetails('1')
      expect(component.router.navigate).toHaveBeenCalledWith(["/catalog/1"]);
    });

    it("checkLogIn should redirect to catalog if user not auth", () => {
      const { component, fixture } = setup();  
      fixture.detectChanges()
      component.activeUser.id = null
      spyOn(component.router, 'navigate')
      component.checkLogIn()
      expect(component.router.navigate).toHaveBeenCalledWith(["/catalog/"]);
    });

    it("addToCart should open pop up if size not choosen", () => {
      let id = "1";
      let itemSize = null;
      let itemColor = "Red";
      let itemName = "shiry";
      const { fixture, component } = setup();
      spyOn(component, "openSnackBar");
      component.addToCart(id, itemSize, itemColor, itemName);
      expect(component.openSnackBar).toHaveBeenCalled();
    });

    it("addToCart should open pop up if color not choosen", () => {
      let id = "1";
      let itemSize = "L";
      let itemColor = null;
      let itemName = "shiry";
      const { fixture, component } = setup();
      spyOn(component, "openSnackBar");
      component.addToCart(id, itemSize, itemColor, itemName);
      expect(component.openSnackBar).toHaveBeenCalled();
    });

    it("addToCart should sent data to service", () => {
      const { userService } = setup();
      let id = "1";
      let itemSize = "L";
      let itemColor = "Red";
      let itemName = "shirt";
      const { fixture, component } = setup();
      spyOn(userService, "addItemToCart");
      spyOn(component, "openSnackBar");
      component.addToCart(id, itemSize, itemColor, itemName);
      expect(userService.addItemToCart).toHaveBeenCalledWith({
        itemId: id,
        itemSize: itemSize,
        itemColor: itemColor
      });
      expect(component.openSnackBar).toHaveBeenCalled();
    });

    it("should get data to create tables", fakeAsync(() => {
      const { component, httpService, fixture } = setup();
     
      fixture.detectChanges();
      component.activeUser.favoriteItems = ["1"];

      const mockItemOne = [
        {
          _id: "1",
          section: "clothes",
          type: "shirt",
          brand: "Zara",
          name: "Basic shirt",
          discription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
          gender: "Man",
          color: ["Red"],
          size: ["XS", "M", "L"],
          img: "http://nowdeem.com/img/products/1531567492.jpg",
          price: 16,
          availability: true
        }
      ];

      spyOn(httpService, "getCartItemsObjects")
        .withArgs(["1"])
        .and.returnValue(
          Observable.create((observer: Observer<any[]>) => {
            observer.next(mockItemOne);
            return observer;
          })
        );

      tick();
      component.getDataToView();
      expect(component.favoriteItems.length).toBe(1);
      expect(component.favoriteItems[0].brand).toBe("Zara");
    }));
  });
});
