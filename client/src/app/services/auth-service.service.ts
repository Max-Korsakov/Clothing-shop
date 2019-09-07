import { Injectable } from "@angular/core";
import { User } from "../models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class AuthServiceService {
  private token = null;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>("http://localhost:5000/auth/login", user)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem("auth-token", token);
          this.setToken(token);
        })
      );
  }

  register(user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>("http://localhost:5000/auth/register", user);
  }

  isAuth(): boolean {
    return !!localStorage.getItem("auth-token");
  }

  logout() {
    this.token = null;
    localStorage.clear();
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  decode(): User {
    return jwt_decode(localStorage.getItem("auth-token"));
  }
}
