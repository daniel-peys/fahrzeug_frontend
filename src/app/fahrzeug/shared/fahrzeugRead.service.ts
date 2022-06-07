/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
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

export interface Suchkriterien {
    kennzeichen: string;
    fahrzeugtyp: Fahrzeugtyp | '';
    fahrzeughalter: Fahrzeughalter;
}

export interface FahrzeugeServer {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _embedded: {
        fahrzeuge: FahrzeugServer[];
    };
}

// Methoden der Klasse HttpClient
//  * get(url, options) – HTTP GET request
//  * post(url, body, options) – HTTP POST request
//  * put(url, body, options) – HTTP PUT request
//  * patch(url, body, options) – HTTP PATCH request
//  * delete(url, options) – HTTP DELETE request

// Eine Service-Klasse ist eine "normale" Klasse gemaess ES 2015, die mittels
// DI in eine Komponente injiziert werden kann, falls sie innerhalb von
// provider: [...] bei einem Modulbereitgestellt wird.
// Eine Komponente realisiert gemaess MVC-Pattern den Controller und die View.
// Die Anwendungslogik wird vom Controller an Service-Klassen delegiert.
// Service:
// - wiederverwendbarer Code: in ggf. verschiedenen Controller
// - Zugriff auf Daten, z.B. durch Aufruf von RESTful Web Services
// - View (HTML-Template) <- Controller <- Service
// https://angular.io/guide/singleton-services

/**
 * Die Service-Klasse zu B&uuml;cher wird zum "Root Application Injector"
 * hinzugefuegt und ist in allen Klassen der Webanwendung verfuegbar.
 */
@Injectable({ providedIn: 'root' })
export class FahrzeugReadService {
    readonly #baseUrl = paths.api;

    /**
     * @param httpClient injizierter Service HttpClient (von Angular)
     * @return void
     */
    constructor(private readonly httpClient: HttpClient) {
        log.debug('BuchReadService.constructor: baseUrl=', this.#baseUrl);
    }

    /**
     * Buecher anhand von Suchkriterien suchen
     * @param suchkriterien Die Suchkriterien
     * @returns Gefundene Buecher oder Statuscode des fehlerhaften GET-Requests
     */
    find(
        suchkriterien: Suchkriterien | undefined = undefined, // eslint-disable-line unicorn/no-useless-undefined
    ): Observable<Fahrzeug[] | FindError> {
        log.debug('BuchReadService.find: suchkriterien=', suchkriterien);
        // log.debug(
        //     `BuchReadService.find: suchkriterien=${JSON.stringify(
        //         suchkriterien,
        //     )}`,
        // );

        const url = this.#baseUrl;
        log.debug('BuchReadService.find: url=', url);

        // Query-Parameter ?titel=x&art=KINDLE&...
        const params = this.#suchkriterienToHttpParams(suchkriterien);

        // Promise:
        // - Einzelner Wert
        // - Kein Cancel
        //
        // Observable aus RxJS:
        // - die Werte werden "lazy" in einem Stream bereitgestellt
        // - Operatoren: map, forEach, filter, ...
        // - Ausfuehrung nur dann, wenn es einen Aufruf von subscribe() gibt
        // - firstValueFrom() konvertiert den ersten Wert in ein Promise
        // - Cancel ist moeglich
        // https://stackoverflow.com/questions/37364973/what-is-the-difference-between-promises-and-observables

        return (
            this.httpClient
                .get<FahrzeugeServer>(url, { params })

                // pipe ist eine "pure" Funktion, die ein Observable in ein NEUES Observable transformiert
                .pipe(
                    // 1 Datensatz empfangen und danach implizites "unsubscribe"
                    // entspricht take(1)
                    first(),

                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    catchError((err: unknown, _$) =>
                        of(this.#buildFindError(err as HttpErrorResponse)),
                    ),

                    // entweder Observable<BuecherServer> oder Observable<FindError>
                    map(restResult => this.#toFahrzeugArrayOrError(restResult)),
                )
        );

        // Same-Origin-Policy verhindert Ajax-Datenabfragen an einen Server in
        // einer anderen Domain. JSONP (= JSON mit Padding) ermoeglicht die
        // Uebertragung von JSON-Daten ueber Domaingrenzen.
        // Falls benoetigt, gibt es in Angular dafuer den Service Jsonp.
    }

    #toFahrzeugArrayOrError(
        restResult: FahrzeugeServer | FindError,
    ): Fahrzeug[] | FindError {
        log.debug(
            'BuchReadService.#toBuchArrayOrError: restResult=',
            restResult,
        );
        if (restResult instanceof FindError) {
            return restResult;
        }

        // eslint-disable-next-line no-underscore-dangle
        const fahrzeuge = restResult._embedded.fahrzeuge.map(fahrzeugServer =>
            toFahrzeug(fahrzeugServer),
        );
        log.debug('BuchReadService.#toBuchArrayOrError: buecher=', fahrzeuge);
        return fahrzeuge;
    }

    /**
     * Ein Buch anhand der ID suchen
     * @param id Die ID des gesuchten Buchs
     */
    findById(id: string | undefined): Observable<Fahrzeug | FindError> {
        log.debug('BuchReadService.findById: id=', id);

        if (id === undefined) {
            log.debug('BuchReadService.findById: Keine Id');
            return of(this.#buildFindError());
        }

        // wegen fehlender Versionsnummer (im ETag) nachladen
        const url = `${this.#baseUrl}/${id}`;
        log.debug('BuchReadService.findById: url=', url);

        return (
            this.httpClient
                /* eslint-disable object-curly-newline */
                .get<FahrzeugServer>(url, {
                    observe: 'response',
                })
                /* eslint-enable object-curly-newline */

                .pipe(
                    // 1 Datensatz empfangen und danach implizites "unsubscribe"
                    first(),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    catchError((err: unknown, _$) => {
                        const errResponse = err as HttpErrorResponse;
                        return of(this.#buildFindError(errResponse));
                    }),

                    // entweder Observable<HttpResponse<BuchServer>> oder Observable<FindError>
                    map(restResult => this.#toBuchOrError(restResult)),
                )
        );
    }

    #toBuchOrError(
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
        log.debug('BuchReadService.#toBuchOrError: etag=', etag);

        const fahrzeug = toFahrzeug(body, etag);
        return fahrzeug;
    }

    /**
     * Suchkriterien in Request-Parameter konvertieren.
     * @param suchkriterien Suchkriterien fuer den GET-Request.
     * @return Parameter fuer den GET-Request
     */
    #suchkriterienToHttpParams(
        suchkriterien: Suchkriterien | undefined,
    ): HttpParams {
        log.debug(
            'BuchReadService.#suchkriterienToHttpParams: suchkriterien=',
            suchkriterien,
        );
        let httpParams = new HttpParams();

        if (suchkriterien === undefined) {
            return httpParams;
        }

        const { kennzeichen, fahrzeugtyp, fahrzeughalter } = suchkriterien;
        const { vorname, nachname } = fahrzeughalter;

        if (kennzeichen !== '') {
            httpParams = httpParams.set('kennzeichen', kennzeichen);
        }

        if (fahrzeugtyp !== '') {
            httpParams = httpParams.set('fahrzeugtyp', fahrzeugtyp);
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
            'BuchReadService.#buildFindError: status / Response-Body=',
            status,
            error,
        );
        return new FindError(status, err);
    }
}
