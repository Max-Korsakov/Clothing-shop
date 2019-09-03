import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private auth: AuthServiceService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> {
        if (this.auth.isAuth()) {
            return of(true);
        } else {

            this.router.navigate(['/login'], {
                queryParams: {
                    accessDenied: true
                }
            });
            return of(false);
        }
    }

    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state);
    }
}
