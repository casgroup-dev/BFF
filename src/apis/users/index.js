const TOKEN_NAME = 'token'

/**
 * Validates the credentials and return a promise that resolves with the token of the user. Rejects an error with
 * a message when the user cannot log in. The message could be a connection error or a validation error.
 * @param {String} email
 * @param {String} password
 * @return {Promise<String>}
 */
function login (email, password) {
  // TODO: Call the real api
  return new Promise((resolve, reject) => {
    // Simulate an api call with a timeout of one seconds that resolves or reject the promise with equal probability.
    setTimeout(() => {
      Math.random() > 0.5
        ? resolve('this is a false token')
        : reject(new Error(`Email y contraseña no coinciden.`))
    }, 1000)
  }).then(token.save)
}

/**
 * Register a new user. If it's all ok the promise is resolved void and if there are errors in the process
 * rejects the promise with a correct error message.
 * @param {String} name
 * @param {String} email
 * @param {String} company
 * @param {String} role
 * @param {String} phone
 * @param {String} pass
 * @param {String} passConfirm
 * @returns {Promise<void>}
 */
function register (name, email, company, role, phone, pass, passConfirm) {
  // TODO: Define parameters and simulate the api call (see login function).
  return new Promise((resolve, reject) => {
    // Simulate an api call with a timeout of one seconds that resolves or reject the promise with equal probability.
    setTimeout(() => {
      Math.random() > 0.5
        ? resolve('this is a false token')
        : reject(new Error(`Email y contraseña no coinciden.`))
    }, 1000)
  }).then(token.save)
}

/**
 * Check if the user is logged in the site and returns a boolean.
 * @return {boolean}
 */
function isLoggedIn () {
  return !!token.get()
}

const token = {
  /**
   * Saves the token of the user to keep him logged in.
   * @param {String} token
   */
  save: token => localStorage.setItem(TOKEN_NAME, token),
  /**
   * Gets the token from the storage.
   * @return {string | null}
   */
  get: () => localStorage.getItem(TOKEN_NAME)
}

export default {
  isLoggedIn,
  login,
  register
}
