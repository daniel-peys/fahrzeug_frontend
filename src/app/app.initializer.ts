import { Temporal } from '@js-temporal/polyfill';
import { VERSION } from '@angular/core';
import { environment } from '../environments/environment';
import log from 'loglevel';

export const appInitializer = () => () => {
    if (environment.production) {
        log.disableAll();
        return;
    }

    log.enableAll();
    log.debug('appInitializer()');
    log.debug(`Angular ${VERSION.full}: Die Webanwendung wird gestartet`);
    log.debug(Temporal.Now.zonedDateTimeISO().toLocaleString());
    log.debug('Check https://frontendchecklist.io');

    try {
        // eslint-disable-next-line no-eval
        eval(
            'class C { #priv() { console.log("ES 2022 wird z.T. unterstuetzt"); } pub() { this.#priv(); }} const c = new C(); c.pub();',
        );
        // optional catch binding
    } catch {
        log.warn('ES 2022 wird NICHT unterstuetzt.');
    }
};
