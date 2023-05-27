import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AdminAuthGuard implements CanLoad {
	constructor(private authService: AuthenticationService, private router: Router) {}



	canLoad(): Observable<boolean> {
		return this.authService.isAdminAuthenticated.pipe(
			filter((val) => val !== null), // Filter out initial Behaviour subject value
			take(1), // Otherwise the Observable doesn't complete!
			map((isAdminAuthenticated) => {
				if (isAdminAuthenticated) {
					return true;
				} else {
					this.router.navigateByUrl('/admin-login');
					return false;
				}
			})
		);
	}
}