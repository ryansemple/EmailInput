/* eslint-disable no-useless-escape */

/**
 * All standard keyboard keys. Emojis and other non standard
 * characters will not match this Regex.
 */
export const allKeyboardKeysRegex: RegExp = 
new RegExp(/^[a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  ]*$/);

/* eslint-enable no-useless-escape */