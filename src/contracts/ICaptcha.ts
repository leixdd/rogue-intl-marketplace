/*
* This code defines two interfaces, ICaptcha and ICaptchaRequest.
*/

/**
 * Interface representing a Captcha object.
 * @interface
 * @property {string} image - A string representing an image in base64 format.
 * @property {string} phpsession - A string representing a PHP session.
 */
export interface ICaptcha {
    image: string, //base64
    phpsession: string
}

/**
 * Interface representing a Captcha Request object.
 * @interface
 * @property {string} sx - A string representing a session.
 * @property {string} server - A string representing the server where the session is stored.
 */
export interface ICaptchaRequest {
    sx: string; //session
    server: string
}