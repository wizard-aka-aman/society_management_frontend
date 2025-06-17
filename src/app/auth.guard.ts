import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const routes = inject(Router); 

  // Check if the user is logged in
  const ServiceSrv = inject(ServiceService);
  const username = ServiceSrv.getUserName();
  const role = ServiceSrv.getRole();
  const { routeConfig } = route;
  const path = routeConfig?.path; 

  if (path?.includes("add-society") && role !== 'SuperAdmin') {
    routes.navigateByUrl('/home');
    return false;
  }
  if (
    role === "User" && (
      path?.includes("societysetting") ||
      path?.includes("manage-users") ||
      path?.includes("flats") ||
      path?.includes("register") ||
      path?.includes("registerAdmin")
    )
  ) {
    routes.navigateByUrl('/home');
    return false;
  }
  if (
    role === "SuperAdmin" && (
      path?.includes("bills") ||
      path?.includes("complaints") ||
      path?.includes("bookings") ||
      path?.includes("notices") ||
      path?.includes("flats") ||
       path === "register" ||
      path?.includes("societysetting") ||
      path?.includes("visitors")
    )
  ) {
    routes.navigateByUrl('/home');
    return false;
  }


  // const {route}
  if (username != null) {
    return true;
  }
  else {
    routes.navigateByUrl('/login');
    return false;
  }
};
