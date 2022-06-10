import { Injectable } from '@angular/core';
import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

@Injectable({ providedIn: 'root' })
export class StorageService {
    private static readonly AUTHORIZATION = 'authorization';

    private static readonly ROLES = 'roles';

    private static readonly SEPARATOR = ',';

    constructor() {
        log.debug('StorageService.constructor()');
    }

    get authorization() {
        return this.#getCookie(StorageService.AUTHORIZATION);
    }

    saveAuthorization(
        authorization: string,
        roles: string[],
        expirationInMillis: number = Temporal.Now.instant().add({ minutes: 60 })
            .epochMilliseconds,
    ) {
        this.#setCookie(
            StorageService.AUTHORIZATION,
            authorization,
            expirationInMillis,
        );
        const rolesStr: string = roles.join(StorageService.SEPARATOR);
        log.debug('StorageService.saveAuthorization: rolesStr=', rolesStr);
        this.#setCookie(StorageService.ROLES, rolesStr, expirationInMillis);
    }

    get roles() {
        const rolesStr = this.#getCookie(StorageService.ROLES);
        return rolesStr === undefined
            ? []
            : rolesStr.split(StorageService.SEPARATOR);
    }

    deleteAuthorization() {
        this.#deleteCookie(StorageService.AUTHORIZATION);
        this.#deleteCookie(StorageService.ROLES);
    }

    /**
     * @param name name of the searched cookie
     * @return values of the searched cookie or undefined
     */
    #getCookie(name: string) {
        const encodedName = encodeURIComponent(name);
        const regexp = new RegExp(
            `(?:^${encodedName}|;\\s*${encodedName})=(.*?)(?:;|$)`,
            'gu',
        );
        // search all cookies
        const result = regexp.exec(document.cookie);
        if (result === null) {
            return;
        }
        const [, encoded] = result as (string | undefined)[];
        if (encoded === undefined) {
            return;
        }
        return decodeURIComponent(encoded);
    }

    /**
     * @param name name of the cookie
     * @param value value of the cookie
     * @param expires expiry date of the cookie. default is session.
     * @param path path of the cookies. default: /.
     * @param domain domain of the cookie. default: current domain.
     */
    // eslint-disable-next-line max-params
    #setCookie(
        name: string,
        value: string,
        expires?: number,
        path?: string,
        domain?: string,
    ) {
        let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(
            value,
        )};`;

        if (expires !== undefined) {
            const expirationDate = new Date(expires);
            cookieStr += `expires=${expirationDate.toUTCString()};`;
        }
        if (path !== undefined) {
            cookieStr += `path=${path};`;
        }
        if (domain !== undefined) {
            cookieStr += `domain=${domain};`;
        }

        // transmission only with HTTPS
        cookieStr += 'Secure;';

        // protection of XSS
        cookieStr += 'SameSite=Strict;';

        log.debug('StorageService.#setCookie: ', cookieStr);
        // create new cookie
        document.cookie = cookieStr;
    }

    /**
     * @param name name of the cookie
     * @param path path of the cookies
     * @param domain domain des cookies, default: recent domain.
     */
    #deleteCookie(name: string, path?: string, domain?: string) {
        if (this.#getCookie(name) !== undefined) {
            // expires in der Vergangenheit
            this.#setCookie(name, '', -1, path, domain);
        }
    }
}
