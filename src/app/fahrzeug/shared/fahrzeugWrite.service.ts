// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    HttpClient,
    type HttpErrorResponse,
    HttpHeaders,
    HttpResponse,
} from '@angular/common/http';
import { type Observable, of } from 'rxjs';
import { RemoveError, SaveError, UpdateError } from './errors';
import { catchError, first, map } from 'rxjs/operators';
import { type Fahrzeug } from './fahrzeug';
import { Injectable } from '@angular/core';
import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';
import { paths } from '../../shared';
import { toFahrzeugServer } from './fahrzeugServer';

/**
 * the service class becomes a root application injector
 */
@Injectable({ providedIn: 'root' })
export class FahrzeugWriteService {
    readonly #baseUrl = paths.api;

    /**
     * @param httpClient injected service httpClient (from angular)
     * @return void
     */
    constructor(private readonly httpClient: HttpClient) {
        log.debug('FahrzeugWriteService.constructor: baseUrl=', this.#baseUrl);
    }

    /**
     * create a new fahrzeug
     * @param newFahreug the JSON-Object with a new book
     */
    save(fahrzeug: Fahrzeug): Observable<SaveError | string> {
        log.debug('FahrzeugWriteService.save: buch=', fahrzeug);
        fahrzeug.erstzulassung = Temporal.Now.plainDateISO();
        log.debug('FahrzeugWriteService.save: buch=', fahrzeug);

        /* eslint-disable @typescript-eslint/naming-convention */
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'text/plain',
        });
        /* eslint-enable @typescript-eslint/naming-convention */

        return this.httpClient
            .post(this.#baseUrl, toFahrzeugServer(fahrzeug), {
                headers,
                observe: 'response',
                responseType: 'text',
            })
            .pipe(
                first(),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                catchError((err: unknown, _$) => {
                    const errResponse = err as HttpErrorResponse;
                    return of(new SaveError(errResponse.status, errResponse));
                }),

                // entweder Observable<HttpResponse<string>> oder Observable<SaveError>
                map(result => this.#mapSaveResultToId(result)),
            );
    }

    #mapSaveResultToId(
        result: HttpResponse<string> | SaveError,
    ): SaveError | string {
        if (!(result instanceof HttpResponse)) {
            return result;
        }

        const response = result;
        log.debug(
            'FahrzeugWriteService.#mapSaveResultToId: map: response',
            response,
        );

        // extract id from te header
        const location = response.headers.get('Location');
        const id = location?.slice(location.lastIndexOf('/') + 1);

        if (id === undefined) {
            return new SaveError(-1, 'Keine Id');
        }

        return id;
    }

    /**
     * update a fahrzeug
     * @param fahrzeug the JSON-Object with the new Fahrzeugdaten
     */
    update(fahrzeug: Fahrzeug): Observable<Fahrzeug | UpdateError> {
        log.debug('FahrzeugWriteService.update: buch=', fahrzeug);

        const { id, version, ...fahrzeugDTO } = fahrzeug;
        if (version === undefined) {
            const msg = `Keine Versionsnummer fuer das Fahrzeug ${id}`;
            log.debug(msg);
            return of(new UpdateError(-1, msg));
        }

        const url = `${this.#baseUrl}/${id}`;
        /* eslint-disable @typescript-eslint/naming-convention */
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'text/plain',
            'If-Match': `"${version}"`,
        });
        /* eslint-enable @typescript-eslint/naming-convention */
        log.debug('FahrzeugWriteService.update: headers=', headers);

        log.debug('FahrzeugWriteService.update: buchDTO=', fahrzeugDTO);
        return this.httpClient
            .put(url, fahrzeugDTO, { headers, observe: 'response' })
            .pipe(
                first(),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                catchError((err: unknown, _$) => {
                    const errResponse = err as HttpErrorResponse;
                    log.debug('BuchWriteService.update: err=', err);
                    return of(new UpdateError(errResponse.status, errResponse));
                }),

                map(result => this.#mapUpdateResultToVersion(result)),

                map(versionOderError => {
                    if (versionOderError instanceof UpdateError) {
                        return versionOderError;
                    }
                    fahrzeug.version = versionOderError;
                    return fahrzeug;
                }),
            );
    }

    #mapUpdateResultToVersion(
        result: HttpResponse<unknown> | UpdateError,
    ): UpdateError | number {
        if (result instanceof UpdateError) {
            return result;
        }

        const response = result;
        log.debug(
            'FahrzeugWriteService.#mapUpdateResultToVersion: response',
            response,
        );
        const etag = response.headers.get('ETag');
        log.debug(
            'FahrzeugWriteService.#mapUpdateResultToVersion: etag=',
            etag,
        );

        const ende = etag?.lastIndexOf('"');
        const versionStr = etag?.slice(1, ende) ?? '1';
        return Number.parseInt(versionStr, 10);
    }

    /**
     * delete a fahrzeug
     * @param fahrzug the JSON-Object with the fahrzeug
     */
    remove(
        fahrzeug: Fahrzeug,
    ): Observable<Record<string, unknown> | RemoveError> {
        log.debug('FahrzeugWriteService.remove: buch=', fahrzeug);
        const url = `${this.#baseUrl}/${fahrzeug.id}`;

        return this.httpClient.delete(url).pipe(
            first(),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            catchError((err: unknown, _$) => {
                const errResponse = err as HttpErrorResponse;
                return of(new RemoveError(errResponse.status));
            }),

            map(result => {
                if (result instanceof RemoveError) {
                    return result;
                }
                return {};
            }),
        );
    }
}
