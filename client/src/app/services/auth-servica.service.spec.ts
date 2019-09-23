import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { HttpServiceService } from "../services/http-service.service";
import { AuthServiceService } from "./auth-service.service";
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [HttpServiceService, HttpParams],
    imports: [HttpClientTestingModule]
  });
});

describe("AuthServiceService", () => {
  describe("ForHttpServiceService", () => {
    function setup() {
      const authService = TestBed.get(AuthServiceService);
      const httpTestingController = TestBed.get(HttpTestingController);
      return { authService, httpTestingController };
    }

    it("should be created", () => {
      const { authService, httpTestingController } = setup();
      expect(authService).toBeTruthy();
    });

    it("register shouls send req with id", () => {
      const { authService, httpTestingController } = setup();
      let userId = "1";
      authService.register(userId).subscribe(data => {
        expect(data).toEqual("User was registered");
      });
      const req = httpTestingController.expectOne(
        "http://localhost:5000/auth/register"
      );
      expect(req.request.method).toBe("POST");
      expect(req.request.body).toBe("1");
      req.flush("User was registered");
    });

    it("login shouls send req with id and set data to localstorage", () => {
      const { authService, httpTestingController } = setup();
      let userId = "1";
      spyOn(authService, "setToken");
      spyOn(localStorage, "setItem");
      authService.login(userId).subscribe(data => {
        expect(data).toEqual("Token");
        expect(authService.setToken).toHaveBeenCalled();
        expect(localStorage.setItem).toHaveBeenCalled();
      });

      const req = httpTestingController.expectOne(
        "http://localhost:5000/auth/login"
      );

      expect(req.request.method).toBe("POST");
      expect(req.request.body).toBe("1");

      req.flush("Token");
    });
  });
  afterEach(() => {
    const httpTestingController = TestBed.get(HttpTestingController);
    httpTestingController.verify();
  });
});
