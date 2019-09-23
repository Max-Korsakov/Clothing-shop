import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { HttpServiceService } from "../services/http-service.service";
import { DebugElement } from "@angular/core";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserServiceService } from "../services/user-service.service";
import { CatalogComponent } from "./catalog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDividerModule } from "@angular/material/divider";
import { MatSnackBarConfig } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatBadgeModule } from "@angular/material/badge";
import { MatSliderModule } from "@angular/material/slider";
import { MatPaginatorModule } from "@angular/material/paginator";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { User } from "../models";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
describe("CatalogComponent", () => {
  //let component: CatalogComponent;
  // let fixture: ComponentFixture<CatalogComponent>;
  // let debugEl: DebugElement;
  // let userService: UserServiceService;
  let userMock: User;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogComponent],
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
      const fixture = TestBed.createComponent(CatalogComponent);
      const component = fixture.componentInstance;
      const userService = fixture.debugElement.injector.get(UserServiceService);
      const httpService = fixture.debugElement.injector.get(HttpServiceService);
      return { fixture, component, userService, httpService };
    }

    const userMock = {
      id: "1",
      email: "test@test.ru",
      password: "qwerty",
      firstName: "Name",
      newCartItems: [{ itemId: "1111", itemSize: "M", itemColor: "Red" }],
      cartItems: [{ itemId: "2222", itemSize: "L", itemColor: "Blue" }],
      favoriteItems: ["1111"]
    };

    it("should create", () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });

    it("should set user data from UserService", fakeAsync(() => {
      const { fixture, component, userService } = setup();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.userId).toBe(null);
        expect(component.userFavorite).toEqual([]);
        userService.foo.next(userMock);
        userService.foo.subscribe(userMock => {
          expect(component.userId).toEqual(userMock.id);
          expect(component.userFavorite).toEqual(userMock.favoriteItems);
        });
      });
    }));

    it("should set filter properties", done => {
      const { fixture, component, httpService } = setup();
      const httpRes = {
        filterProps: {
          filterGender: ["W"],
          filterBrands: ["Zara"],
          filterTypes: ["shirt"],
          filterColors: ["Red"],
          filterSizes: ["L"]
        }
      };
      spyOn(httpService, "getFilterProps").and.returnValue(of(httpRes));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.properties.gender[1]).toEqual("W");
        expect(component.properties.brand[1]).toEqual("Zara");
        expect(component.properties.type[1]).toEqual("shirt");
        expect(component.properties.color[1]).toEqual("Red");
        expect(component.properties.size[1]).toEqual("L");
      });
      done();
    });




    it("should view items", () => {
      const { fixture, component, httpService } = setup();
      component.catalogLength = 2;
      component.catalog = [
        {
          id: "1",
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
        },
        {
          id: "2",
          section: "clothes",
          type: "shirt",
          brand: "Colins",
          name: "Basic shirt",
          discription: "This is best shirt ever",
          gender: "Man",
          color: ["Red"],
          size: ["M"],
          img:
            "https://static.zara.net/photos///2019/V/0/2/p/3057/429/615/2/w/560/3057429615_1_1_1.jpg?ts=1552666222871",
          price: 25,
          availability: true
        }
      ];

      fixture.detectChanges();
      const infoMessageEl: HTMLElement = fixture.debugElement.nativeElement;
      const nodeList = infoMessageEl.querySelectorAll(
        ".catalog__product-card-item"
      );
      const nodeArray = Array.from(nodeList);
      let cartItemOne = nodeArray[0];
      expect(cartItemOne.querySelector(".item-name").innerHTML).toBe(
        "Basic shirt"
      );
      expect(cartItemOne.querySelector(".item-brand").innerHTML).toBe("Zara");
      expect(cartItemOne.querySelector(".item-price").innerHTML).toBe(
        "Price: 16 $"
      );
      let cartItemTwo = nodeArray[1];
      expect(cartItemTwo.querySelector(".item-name").innerHTML).toBe(
        "Basic shirt"
      );
      expect(cartItemTwo.querySelector(".item-brand").innerHTML).toBe("Colins");
      expect(cartItemTwo.querySelector(".item-price").innerHTML).toBe(
        "Price: 25 $"
      );
    });

    it("cart component should view datails button", () => {
      const { fixture, component } = setup();
      component.catalogLength = 1;
      component.catalog = [
        {
          id: "1",
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

      fixture.detectChanges();
      const infoMessageEl: HTMLElement = fixture.debugElement.nativeElement;
      const nodeList = infoMessageEl.querySelectorAll(
        ".catalog__product-card-item"
      );
      const nodeArray = Array.from(nodeList);
      let cartItemOne = nodeArray[0];
      expect(cartItemOne.querySelector(".datails-button")).toBeTruthy();
    });

    it("cart component should view add to favorite button if userId is true", () => {
      const { fixture, component } = setup();
      component.catalogLength = 1;

      component.catalog = [
        {
          id: "1",
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

      fixture.detectChanges();
      component.userId = "1";
      fixture.detectChanges();
      const infoMessageEl: HTMLElement = fixture.debugElement.nativeElement;
      const nodeList = infoMessageEl.querySelectorAll(
        ".catalog__product-card-item"
      );
      const nodeArray = Array.from(nodeList);
      let cartItemOne = nodeArray[0];
      expect(cartItemOne.querySelector(".add-favorite")).toBeTruthy();
    });

    it("datails button click should call function", () => {
      const { fixture, component } = setup();
      component.catalogLength = 1;
      component.catalog = [
        {
          id: "1",
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

      fixture.detectChanges();
      const infoMessageEl: HTMLElement = fixture.debugElement.nativeElement;
      const nodeList = infoMessageEl.querySelectorAll(
        ".catalog__product-card-item"
      );
      const nodeArray = Array.from(nodeList);
      let cartItemOne = nodeArray[0];
      let detailsButton: HTMLElement = cartItemOne.querySelector(
        ".datails-button"
      );
      spyOn(component, "openItemDetails");
      detailsButton.click();
      expect(component.openItemDetails).toHaveBeenCalled();
    });

    it("add to favorite button click should call function", () => {
      const { fixture, component } = setup();
      component.catalogLength = 1;
      component.catalog = [
        {
          id: "1",
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

      fixture.detectChanges();
      component.userId = "1";
      fixture.detectChanges();
      const infoMessageEl: HTMLElement = fixture.debugElement.nativeElement;
      const nodeList = infoMessageEl.querySelectorAll(
        ".catalog__product-card-item"
      );
      const nodeArray = Array.from(nodeList);
      let cartItemOne = nodeArray[0];
      let button: HTMLElement = cartItemOne.querySelector(
        ".add-favorite"
      );
      spyOn(component, "addToFavorite");
      button.click();
      expect(component.addToFavorite).toHaveBeenCalled();
    });

    it("paginator should exist if catalog true", () => {
      const { fixture, component } = setup();
      component.catalog = [
        {
          id: "1",
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
      component.catalogLength = 1;
      fixture.detectChanges();
      const infoMessageEl: HTMLElement = fixture.debugElement.nativeElement;
      const paginator = infoMessageEl.querySelector(
        ".paginator"
      );
      expect(paginator).toBeTruthy();
    });

    it("paginator should not exist if catalog empty", () => {
      const { fixture, component } = setup();
      component.catalog = [];
    
      fixture.detectChanges();
      const infoMessageEl: HTMLElement = fixture.debugElement.nativeElement;
      const paginator = infoMessageEl.querySelector(
        ".paginator"
      );
      expect(paginator).toBeFalsy();
    });


    it("addToCart should open pop up if size not choosen", () => {
      let id = '1' 
      let itemSize = null 
      let itemColor = 'Red' 
      let itemName = 'shiry'
      const { fixture, component } = setup();
      spyOn(component, "openSnackBar");
      component.addToCart(id, itemSize, itemColor, itemName);
      expect(component.openSnackBar).toHaveBeenCalled();
    });

    it("addToCart should open pop up if color not choosen", () => {
      let id = '1' 
      let itemSize = 'L' 
      let itemColor = null 
      let itemName = 'shiry'
      const { fixture, component } = setup();
      spyOn(component, "openSnackBar");
      component.addToCart(id, itemSize, itemColor, itemName);
      expect(component.openSnackBar).toHaveBeenCalled();
    });

    it("addToCart should sent data to service", () => {
      const { userService } = setup();
      let id = '1'; 
      let itemSize = 'L'; 
      let itemColor = 'Red'; 
      let itemName = 'shirt';
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

    it("addToFavorite should open pop up if item already in favorite", () => {
      const { fixture, component } = setup();
      component.userFavorite = ['1']
      let id = '1'    
      spyOn(component, "openSnackBar");
      component.addToFavorite(id);
      expect(component.openSnackBar).toHaveBeenCalledWith('Item already in favorite');
    });

    it("addToFavorite should send data to servive", () => {
      const { fixture, component, userService } = setup();
      component.userFavorite = []
      let id = '1'    
      spyOn(component, "openSnackBar");
      spyOn(userService, "addItemToFavorite");
      component.addToFavorite(id);
      expect(userService.addItemToFavorite).toHaveBeenCalledWith(id);
      expect(component.openSnackBar).toHaveBeenCalledWith('Item was added to favorite');
    });

  });
});
