import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

// hardcoded user data.
const loggedInUser = {
 id: '1zx-casd123-asdzxc132',
 name: 'Lakindu Hewawasam',
 role: '1'
}

@Injectable({
 providedIn: 'root'
})
export class AuthGuard implements CanActivate {

 // inject the router service to allow navigation.
 constructor(private router: Router, private authService: AuthService) { }

 canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  const { role } =  loggedInUser//this.authService.getUserById();
  const { routeConfig } = route;
  const { path } = routeConfig as Route;

  // allow access to login and signup pages without authentication
  if (path === 'login' || path === 'signup') {
    return true;
  }

  if (path?.includes('admin-home') && role === '2') {
    return true;
  }

  if ((path?.includes('dashboard') || path?.includes('home')) && role === '1') {
    return true;
  }

  this.router.navigateByUrl('/forbidden');
  return false;
}

}

/*
git config --local user.name "demithehomie"
git config --local user.email "demithehomie@gmail.com"

*/