import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const tokenKey = 'token';
const roleKey = 'role';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private jwtHelper: JwtHelperService) { }

  isAuthorized(allowedRoles: string[]): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

    // get token from local storage or state management
    const token = localStorage.getItem(tokenKey);

    // decode token to read the payload details
    const decodeToken = this.jwtHelper.decodeToken(token);

    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!decodeToken) {
      console.log('Invalid token');
      return false;
    }

    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    return allowedRoles.includes(decodeToken[roleKey]);
  }
}
