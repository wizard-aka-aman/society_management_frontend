import { HttpInterceptorFn } from '@angular/common/http';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(next);
  console.log("hahahah");
  
  console.log(req);
  
  
  return next(req);
};
