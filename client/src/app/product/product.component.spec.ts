import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProductComponent } from "./product.component";
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
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpServiceService } from "../services/http-service.service";
import { UserServiceService } from "../services/user-service.service";
describe("ProductComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatButtonToggleModule,
        MatBadgeModule,
        MatSliderModule,
        MatPaginatorModule
      ],

      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  describe(":", () => {
    function setup() {
      const fixture = TestBed.createComponent(ProductComponent);
      const component = fixture.componentInstance;
      const userService = fixture.debugElement.injector.get(UserServiceService);
      const httpService = fixture.debugElement.injector.get(HttpServiceService);
      return { fixture, component, userService, httpService };
    }

    it("should create", () => {
      const { fixture, component, userService } = setup();
      expect(component).toBeTruthy();
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
