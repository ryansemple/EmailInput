/* eslint-disable no-useless-escape */

export const allKeyboardKeysRegex: RegExp = 
new RegExp(/^[a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  ]*$/);

//export const isAlphaNumericRegex: RegExp = new RegExp(/^[a-z0-9]+$/i);

export const isValidEmailRegex: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

/* eslint-enable no-useless-escape */