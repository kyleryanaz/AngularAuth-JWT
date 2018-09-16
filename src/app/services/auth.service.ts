import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class AuthService {
  constructor(private http: Http) {}

  login(credentials) {
    return this.http
      .post("/api/authenticate", JSON.stringify(credentials))
      .map(response => {
        // console.log(response.json());
        let result = response.json();
        if (result && result.token) {
          localStorage.setItem("token", result.token);
          return true;
        }
        return false;
      });
  }

  logout() {
    localStorage.removeItem("token");
  }

  isLoggedIn() {
    // - This -
    return tokenNotExpired();

    // - Does all of... -

    // - This -
    // let jwtHelper = new JwtHelper();
    // // Retrieving token from local storage.
    // let token = localStorage.getItem("token");
    // if (!token) {
    //   return false;
    // } else {
    //   // Collecting expiration date of said token.
    //   let expirationDate = jwtHelper.getTokenExpirationDate(token);
    //   // Determine whether or not the token is expired.
    //   let isExpired = jwtHelper.isTokenExpired(token);

    //   // console.log("Expiration", expirationDate);
    //   // console.log("isExpired", isExpired);

    //   return !isExpired;
    // }
  }
}
