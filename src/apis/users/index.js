const TOKEN_NAME = 'token'

/**
 * Validates the credentials and return a promise that resolves with the token of the user. Rejects an error with
 * a message when the user cannot log in. The message could be a connection error or a validation error.
 * @param {String} email
 * @param {String} password
 * @return {Promise<String>}
 */
function login(email, password) {
  // TODO: Call the real api
  return new Promise((resolve, reject) => {
    // Simulate an api call with a timeout of two seconds that resolves or reject the promise with equal probability.
    setTimeout(() => {
      Math.random() > 0.5
        ? resolve('this is a false token')
        : reject(new Error(`Email y contraseña no coinciden.`))
    }, 2000)
  }).then(token.save)
}

/**
 * Logout the user (remove the token) and redirect him to the login page.
 * @param {Object} router - Router object of Vue.
 */
function logout(router) {
  if (!router) throw new Error('Router must be provided to call this function.')
  token.remove()
  router.push({name: 'login'})
}

/**
 * Register a new user. If it's all ok the promise is resolved void and if there are errors in the process
 * rejects the promise with a correct error message.
 * @returns {Promise<void>}
 */
function register() {
  // TODO: Define parameters and simulate the api call (see login function).
}

/**
 * Check if the user is logged in the site and returns a boolean.
 * @return {boolean}
 */
function isLoggedIn() {
  return !!token.get()
}

/**
 * Check if email exists in database. If not register it.
 * @param email
 * @returns {Promise<any>}
 */
function registerProvider (email) {
  return new Promise((resolve, reject) => {
    // Simulate an api call with a timeout of two seconds that resolves or reject the promise with equal probability.
    setTimeout(() => {
      Math.random() > 0.5
        ? resolve('Agregando proveedor')
        : reject(new Error(`Proveedor existente`))
    }, 2000)
  })
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
  get: () => localStorage.getItem(TOKEN_NAME),
  /**
   * Deletes the token from the local storage.
   */
  remove: () => localStorage.removeItem(TOKEN_NAME)
}

export default {
  isLoggedIn,
  login,
  logout,
  register,
  registerProvider
}
