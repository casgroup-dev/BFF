import axios from 'axios'

const TOKEN_NAME = 'casGroupTokenAuth'
const endpoint = 'http://localhost:3000'
const routes = {
  login: '/auth/login',
  users: '/users',
  shadowUsers: '/shadow/users'
}

/**
 * Returns the correct route with the token of the user.
 * @param route
 * @returns {string}
 */
function getRouteWithToken (route) {
  return `${endpoint + route}?token=${token.get()}`
}

/**
 * Validates the credentials and return a promise that resolves with the token of the user. Rejects an error with
 * a message when the user cannot log in. The message could be a connection error or a validation error.
 * @param {String} email
 * @param {String} password
 * @return {Promise<String>}
 */
function login (email, password) {
  const generalError = new Error('Tuvimos un problema procesando el login, intenta nuevamente más tarde.')
  return new Promise((resolve, reject) => {
    axios.post(getRouteWithToken(routes.login), {email, password})
      .then(res => {
        if (res.data.error && (res.data.error.status === 403 || res.data.error.status === 404)) {
          return reject(new Error('Email o contraseña incorrectos'))
        } else if (res.data.token) {
          return resolve(res.data.token)
        } else {
          return reject(generalError)
        }
      })
      .catch(err => {
        console.error(err)
        return reject(generalError)
      })
  })
}

/**
 * Returns a promise that resolves indicating that the email is a Shadow User or rejects with an error indicating
 * that the email is not a shadow user.
 * @param {String} email - Email to check if it is a shadow user.
 */
function isShadowUser (email) {
  const generalError = new Error('Tuvimos un problema procesando tu solicitud, intenta nuevamente más tarde.')
  return new Promise((resolve, reject) => {
    axios.get(endpoint + routes.shadowUsers + '/' + email)
      .then(res => {
        if (res.data.token) {
          token.save(res.data.token)
          return resolve()
        } else if (res.data.error && res.data.error.status === 404) {
          return reject(new Error('No estás autorizado para registrarte, contacta al administrador del portal.'))
        } else {
          return reject(generalError)
        }
      })
      .catch(err => {
        console.error(err)
        return reject(generalError)
      })
  })
}

/**
 * Register a new user. If it's all ok the promise is resolved void and if there are errors in the process
 * rejects the promise with a correct error message.
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.email
 * @param {String} data.businessName
 * @param {String} data.fantasyName
 * @param {String | Number} data.rut
 * @param {String} data.legalRepresentative
 * @param {String} data.legalRepresentativeEmail
 * @param {String} data.legalRepresentativePhone
 * @param {Array<String>} data.industries
 * @param {String} data.password
 * @returns {Promise<void>}
 */
async function register (data) {
  const generalError = new Error('Tuvimos un error procesando el registro, por favor intenta nuevamente más tarde.')
  return new Promise((resolve, reject) => {
    axios.post(getRouteWithToken('users'), data)
      .then(res => {
        if (res.data.error) return reject(generalError)
        else return resolve()
      })
      .catch(err => {
        console.error(err)
        return reject(err)
      })
  })
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
  isShadowUser,
  login,
  register
}
