// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    type HttpResponse,
} from '@angular/common/http';
import { catchError, first, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';
import { of } from 'rxjs';
import { paths } from '../shared';

type Rolle = 'ACTUATOR' | 'ADMIN' | 'KUNDE';

export interface Identity {
    username: string;
    rollen: Rolle[];
    password?: string;
}

@Injectable({ providedIn: 'root' })
export class BasicAuthService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly storageService: StorageService,
    ) {
        log.debug('BasicAuthService.constructor()');
    }

    /**
     * @param username as string
     * @param password as string
     * @return void
     */
    login(username: string | undefined, password: string | undefined) {
        log.debug(
            `BasicAuthService.login: username=${username}, password=${password}`,
        );
        if (username === undefined || password === undefined) {
            return of();
        }

        const loginPath = `${paths.login}`;
        log.debug('BasicAuthService.login: loginPath=', loginPath);

        /* eslint-disable @typescript-eslint/naming-convention */
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'text/plain',
        });
        /* eslint-enable @typescript-eslint/naming-convention */

        return this.httpClient
            .post<Rolle[]>(
                loginPath,
                `username=${username}&password=${password}`,
                {
                    headers,
                    observe: 'response',
                    responseType: 'json',
                },
            )
            .pipe(
                first(),
                catchError((err: unknown) => {
                    log.debug('JwtService.login: err=', err);
                    return of(err as HttpErrorResponse);
                }),

                map(result => this.#handleLogin(result, username, password)),
            );
    }

    #handleLogin(
        result: HttpErrorResponse | HttpResponse<Rolle[]>,
        username: string,
        password: string,
    ) {
        if (result instanceof HttpErrorResponse) {
            log.error('BasicAuthService.login: result=', result);
            return;
        }
        const { status, ok, body } = result;
        log.debug('BasicAuthService.login: status=', status);
        log.debug('BasicAuthService.login: body', body);
        if (!ok || body === null) {
            const { statusText } = result;
            log.error('JwtService.login: statusText', statusText);
            return;
        }

        const base64 = window.btoa(`${username}:${password}`);
        const basicAuth = `Basic ${base64}`;
        const roles = body;
        console.log(roles);
        this.storageService.saveAuthorization(basicAuth, roles);
        return roles;
    }
}
