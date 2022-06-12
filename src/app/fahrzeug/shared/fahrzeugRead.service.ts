import { type Fahrzeug, type Fahrzeugtyp } from './fahrzeug';
import { type FahrzeugServer, toFahrzeug } from './fahrzeugServer';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    HttpClient,
    type HttpErrorResponse,
    HttpParams,
    type HttpResponse,
} from '@angular/common/http';
import { type Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { type Fahrzeughalter } from './fahrzeughalter';
import { FindError } from './errors';
import { Injectable } from '@angular/core';
import log from 'loglevel';
import { paths } from '../../shared';

/**
 * data template for search criteria
 */
export interface Suchkriterien {
    kennzeichen: string;
    fahrzeugtype: Fahrzeugtyp | '';
    fahrzeughalter: Fahrzeughalter;
}

export interface FahrzeugeServer {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _embedded: {
        fahrzeuge: FahrzeugServer[];
    };
}

/**
 * read service as root application injector
 */
@Injectable({ providedIn: 'root' })
export class FahrzeugReadService {
    readonly #baseUrl = paths.api;

    /**
     * @param httpClient injected service httpClient
     * @return void
     */
    constructor(private readonly httpClient: HttpClient) {
        log.debug('FahrzeugReadService.constructor: baseUrl=', this.#baseUrl);
    }

    /**
     * search Fahrzeuge with search criteria
     * @param suchkriterien search criteria
     * @returns found Fahrzeuge or status code of the failed GET-Request
     */
    find(
        suchkriterien: Suchkriterien | undefined = undefined, // eslint-disable-line unicorn/no-useless-undefined
    ): Observable<Fahrzeug[] | FindError> {
        log.debug('FahrzeugReadService.find: suchkriterien=', suchkriterien);

        const url = this.#baseUrl;
        log.debug('FahrzeugReadService.find: url=', url);

        // query params
        const params = this.#suchkriterienToHttpParams(suchkriterien);

        return this.httpClient.get<FahrzeugeServer>(url, { params }).pipe(
            first(),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            catchError((err: unknown, _$) =>
                of(this.#buildFindError(err as HttpErrorResponse)),
            ),
            // result is Observable<FahreugeServer> or Observable<FindError>
            map(restResult => this.#toFahrzeugArrayOrError(restResult)),
        );
    }

    #toFahrzeugArrayOrError(
        restResult: FahrzeugeServer | FindError,
    ): Fahrzeug[] | FindError {
        log.debug(
            'FahrzeugReadService.#toBuchArrayOrError: restResult=',
            restResult,
        );
        if (restResult instanceof FindError) {
            return restResult;
        }

        // eslint-disable-next-line no-underscore-dangle
        const fahrzeuge = restResult._embedded.fahrzeuge.map(fahrzeugServer =>
            toFahrzeug(fahrzeugServer),
        );
        log.debug(
            'FahrzeugReadService.#toBuchArrayOrError: fahrzeuge=',
            fahrzeuge,
        );
        return fahrzeuge;
    }

    /**
     * search one Fahrzeug with the ID
     * @param id the ID of the fahrzeug
     */
    findById(id: string | undefined): Observable<Fahrzeug | FindError> {
        log.debug('FahrzeugReadService.findById: id=', id);

        if (id === undefined) {
            log.debug('FahrzeugReadService.findById: Keine Id');
            return of(this.#buildFindError());
        }

        // load here, due to the missing version number
        const url = `${this.#baseUrl}/${id}`;
        log.debug('FahrzeugReadService.findById: url=', url);

        return (
            this.httpClient
                /* eslint-disable object-curly-newline */
                .get<FahrzeugServer>(url, {
                    observe: 'response',
                })
                /* eslint-enable object-curly-newline */

                .pipe(
                    first(),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    catchError((err: unknown, _$) => {
                        const errResponse = err as HttpErrorResponse;
                        return of(this.#buildFindError(errResponse));
                    }),
                    // Observable<HttpResponse<BuchServer>> or Observable<FindError>
                    map(restResult => this.#toFahrzeugOrError(restResult)),
                )
        );
    }

    #toFahrzeugOrError(
        restResult: FindError | HttpResponse<FahrzeugServer>,
    ): Fahrzeug | FindError {
        if (restResult instanceof FindError) {
            return restResult;
        }

        const { body, headers } = restResult;
        if (body === null) {
            return this.#buildFindError();
        }

        const etag = headers.get('ETag') ?? undefined;
        log.debug('FahrzeugReadService.#toBuchOrError: etag=', etag);

        const fahrzeug = toFahrzeug(body, etag);
        return fahrzeug;
    }

    /**
     * convert search criteria to request-params
     * @param searchCriteria search critera for the GET-Request.
     * @return params for the GET-Request
     */
    #suchkriterienToHttpParams(
        suchkriterien: Suchkriterien | undefined,
    ): HttpParams {
        log.debug(
            'FahrzeugReadService.#suchkriterienToHttpParams: suchkriterien=',
            suchkriterien,
        );
        let httpParams = new HttpParams();

        if (suchkriterien === undefined) {
            return httpParams;
        }

        const { kennzeichen, fahrzeugtype, fahrzeughalter } = suchkriterien;
        const { vorname, nachname } = fahrzeughalter;

        if (kennzeichen !== '') {
            httpParams = httpParams.set('kennzeichen', kennzeichen);
        }

        if (fahrzeugtype !== '') {
            httpParams = httpParams.set('fahrzeugtyp', fahrzeugtype);
        }

        if (vorname !== '') {
            httpParams = httpParams.set('vorname', vorname);
        }

        if (nachname !== '') {
            httpParams = httpParams.set('nachname', nachname);
        }

        return httpParams;
    }

    #buildFindError(err?: HttpErrorResponse) {
        if (err === undefined) {
            return new FindError(-1);
        }

        if (err.error instanceof ProgressEvent) {
            const msg = 'Client-seitiger oder Netzwerkfehler';
            log.error(msg, err.error);
            return new FindError(-1, err);
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { status, error } = err;
        log.debug(
            'FahrzeugReadService.#buildFindError: status / Response-Body=',
            status,
            error,
        );
        return new FindError(status, err);
    }
}
