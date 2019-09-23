import { TestBed } from "@angular/core/testing";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { HttpServiceService } from "./http-service.service";

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [HttpServiceService, HttpParams],
    imports: [HttpClientTestingModule]
  });
});
const itemsData = [
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
      brand: "Zara",
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

describe("ForHttpServiceService", () => {
  function setup() {
    const httpService = TestBed.get(HttpServiceService);
    const httpTestingController = TestBed.get(HttpTestingController);
    return { httpService, httpTestingController };
  }

  it("should be created", () => {
    const { httpService, httpTestingController } = setup();
    expect(httpService).toBeTruthy();
  });

  it("getFilterProps should return the items data", () => {
    const { httpService, httpTestingController } = setup();
    httpService.getFilterProps().subscribe(data => {
      expect(data).toEqual(itemsData);
    });
    const req = httpTestingController.expectOne(
      "http://localhost:5000/catalog"
    );
    expect(req.request.method).toBe("GET");
    req.flush(itemsData);
  });

  it("searchItems should return the serch items data", () => {
    const { httpService, httpTestingController } = setup();
    let data = 'Zara'
    httpService.searchItems(data).subscribe(result => {
      expect(result).toEqual(itemsData);
    });
    const req = httpTestingController.expectOne(
      "http://localhost:5000/catalog/search?searchData=Zara"
    );
    expect(req.request.url).toBe("http://localhost:5000/catalog/search");
    expect(req.request.params.has('searchData')).toBeTruthy();
    expect(req.request.method).toBe("GET");
    req.flush(itemsData);
  });


  it("getFavoriteItems should return array of id", () => {
    const { httpService, httpTestingController } = setup();
    let userId = '1'
    httpService.getFavoriteItems(userId).subscribe(result => {
      expect(result).toEqual([itemsData[0].id,itemsData[1].id]);
    });
    const req = httpTestingController.expectOne(
      `http://localhost:5000/favorite/${userId}?userId=1`
    );
    expect(req.request.url).toBe(`http://localhost:5000/favorite/${userId}`);
    expect(req.request.params.has('userId')).toBeTruthy();
    expect(req.request.method).toBe("GET");
    req.flush([itemsData[0].id,itemsData[1].id] );
  });


  it("getById should return the item data", () => {
    const { httpService, httpTestingController } = setup();
    let id = itemsData[0].id
    httpService.getById(id).subscribe(data => {
      expect(data).toEqual(itemsData[0]);
    });
    const req = httpTestingController.expectOne(
        `http://localhost:5000/catalog/${id}`
    );
    expect(req.request.method).toBe("GET");
    req.flush(itemsData[0]);
  });

  it("getCartItemsObjects should take id array and return objects", () => {
    const { httpService, httpTestingController } = setup();
    let id = ['1']
    httpService.getCartItemsObjects(id).subscribe(data => {
      expect(data).toEqual(itemsData[0]);
    });
    const req = httpTestingController.expectOne(
        `http://localhost:5000/catalog/items`
    );
    expect(req.request.method).toBe("POST");
    expect(req.request.headers.get('Content-Type')).toBe("application/json");
    expect(req.request.body).toBe('{"itemsArray":["1"]}');
    req.flush(itemsData[0]);
  });

  it("addCartItem should send data and return array of imem's id", () => {
    const { httpService, httpTestingController } = setup();
    let userId = '1';
    let item  = '1'
    httpService.addCartItem(userId,item ).subscribe(data => {
      expect(data).toEqual(['1']);
    });
    const req = httpTestingController.expectOne(
        `http://localhost:5000/cart/${userId}`
    );
    expect(req.request.method).toBe("POST"); 
    expect(req.request.headers.get('Content-Type')).toBe("application/json");
    expect(req.request.body).toBe('{"item":"1"}');
    req.flush(['1']);
  });

  it("addFavoriteItem should send data and return array of imem's id", () => {
    const { httpService, httpTestingController } = setup();
    let userId = '1';
    let item  = '1'
    httpService.addFavoriteItem(userId,item ).subscribe(data => {
      expect(data).toEqual(['1']);
    });
    const req = httpTestingController.expectOne(
        `http://localhost:5000/favorite/${userId}`
    );
    expect(req.request.method).toBe("POST"); 
    expect(req.request.headers.get('Content-Type')).toBe("application/json");
    expect(req.request.body).toBe('{"item":"1"}');
    req.flush(['1']);
  });

  it("deleteFavoriteItem should send data and return array of imem's id", () => {
    const { httpService, httpTestingController } = setup();
    let userId = '1';
    let item  = '1'
    httpService.deleteFavoriteItem(userId,item ).subscribe(data => {
      expect(data).toEqual(['2']);
    });
    const req = httpTestingController.expectOne(
        `http://localhost:5000/delete/${userId}`
    );
    expect(req.request.method).toBe("POST"); 
    expect(req.request.headers.get('Content-Type')).toBe("application/json");
    expect(req.request.body).toBe('{"item":"1"}');
    req.flush(['2']);
  });

  it("deleteCartItem should send data and return array of imem's id", () => {
    const { httpService, httpTestingController } = setup();
    let userId = '1';
    let item  = '1'
    httpService.deleteCartItem(userId,item ).subscribe(data => {
      expect(data).toEqual(['2']);
    });
    const req = httpTestingController.expectOne(
        `http://localhost:5000/cart/delete/${userId}`
    );
    expect(req.request.method).toBe("POST"); 
    expect(req.request.headers.get('Content-Type')).toBe("application/json");
    expect(req.request.body).toBe('{"item":"1"}');
    req.flush(['2']);
  });




  afterEach(() => {
    const { httpTestingController } = setup();
    httpTestingController.verify();
  });

});
