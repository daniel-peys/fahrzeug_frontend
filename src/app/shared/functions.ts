/**
 * @param username the username
 * @param password the password
 * @return encoded string with Base64
 */
export const toBase64 = (username: string, password: string) =>
    window.btoa(`${username}:${password}`);
