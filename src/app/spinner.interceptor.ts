import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { ServiceService } from '../services/service.service';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(ServiceService);
  spinner.show(); 
  return next(req).pipe(
    finalize(() => spinner.hide())
  );
};
 