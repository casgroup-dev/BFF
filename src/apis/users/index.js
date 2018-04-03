const TOKEN_NAME = 'token'

/**
 * Validates the credentials and return a promise that resolves with the token of the user. Rejects an error with
 * a message when the user cannot log in. The message could be a connection error or a validation error.
 * @param {String} email
 * @param {String} password
 * @return {Promise<String>}
 */
function login (email, password) {
  // TODO
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 1
        ? resolve('this is a false token')
        : reject(new Error(`Email y contraseña no coinciden.`))
    }, 2000)
  }).then(saveToken)
}

/**
 * Saves the token of the user to keep him logged in.
 * @param {String} token
 */
function saveToken (token) {
  localStorage.setItem(TOKEN_NAME, token)
}

/**
 * Gets the token from the storage.
 * @return {string | null}
 */
function getToken () {
  return localStorage.getItem(TOKEN_NAME)
}

/**
 * Check if the user is logged in the site and returns a boolean.
 * @return {boolean}
 */
function isLoggedIn () {
  return !!getToken()
}

export default {
  login,
  isLoggedIn
}
