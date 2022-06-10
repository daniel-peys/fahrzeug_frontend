import { type ClassProvider, Injectable } from '@angular/core';
import {
    HTTP_INTERCEPTORS,
    type HttpEvent,
    type HttpHandler,
    type HttpInterceptor,
    type HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { type Observable } from 'rxjs';
import log from 'loglevel';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly authService: AuthService) {
        log.debug('AuthInterceptor.constructor()');
    }

    intercept(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: HttpRequest<any>,
        next: HttpHandler,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Observable<HttpEvent<any>> {
        const authorizationStr = `${this.authService.authorization}`;
        log.debug('authorizationStr=', authorizationStr);

        const requestWithAuthorization = request.clone({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            setHeaders: { Authorization: authorizationStr },
        });

        return next.handle(requestWithAuthorization);
    }
}

export const authInterceptorProvider: ClassProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
