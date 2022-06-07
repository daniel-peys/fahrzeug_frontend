/**
 * Ein Benutzernamen und ein Passwort werden zu einem String zusammengefasst und
 * dabei durch einen Doppelpunkt (:) getrennt. Dieser String wird
 * anschlie&szlig;end mit Base64 codiert. Das Ergebnis kann dann f&uuml;
 * BASIC-Authentifizierung verwendet werden.
 * http://stackoverflow.com/questions/34177221/angular2-how-to-inject-window-into-an-angular2-service
 * https://gist.github.com/gdi2290/f8a524cdfb1f54f1a59c
 * @param username Der Benutzername
 * @param password Das Passwort
 * @return Der mit Base64 codierte String.
 */
export const toBase64 = (username: string, password: string) =>
    window.btoa(`${username}:${password}`);
