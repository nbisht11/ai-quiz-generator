import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AUTH_TOKEN } from '../constants/app.constant';

const EXCLUDED_ENDPOINTS = [ environment.LOGIN_ENDPOINT, environment.HEALTHCHECK_ENDPOINT ]


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const isExcluded = EXCLUDED_ENDPOINTS.some(endpoint => req.url.includes(endpoint));

  if (isExcluded) {
    return next(req);
  }

  if (req.url.includes(environment.GENERATE_QUESTION_ENDPOINT)) {
    const token = sessionStorage.getItem(AUTH_TOKEN); 

    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(authReq);
    }
  }

  return next(req);
};