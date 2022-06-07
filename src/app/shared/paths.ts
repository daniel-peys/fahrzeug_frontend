/**
 * Basis-Pfad fuer den REST-Server wahlweise via:
 * 1) Reverse Proxy oder
 * 2) CORS bei Kubernetes, wozu Port-Forwarding fuer den Web Service
 *    erforderlich ist, der auch in K8s mit TLS läuft.
 */

// webpack dev server und nginx als "Reverse Proxy", d.h. eingehende Requests
const PATH_REST = '/rest';

export const paths = {
    api: `${PATH_REST}/api`,
    login: `${PATH_REST}/auth/login`,
};
