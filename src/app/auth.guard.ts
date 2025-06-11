import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

export const authGuard: CanActivateFn = (route, state) => {
    const routes = inject(Router);
  // Check if the user is logged in
  const ServiceSrv = inject(ServiceService);
    const username = ServiceSrv.getUserName();
  if(username !=null){
    return true;
  }
  else{
    routes.navigateByUrl('/login');
    return false;
  }
};
