import axios from 'axios'

const TOKEN_NAME = 'casGroupTokenAuth'
const endpoint = 'http://localhost:3000'
const routes = {
  companies: '/companies',
  login: '/auth/login',
  shadowUsers: '/shadow/users',
  users: '/users'
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
          token.save(res.data.token)
          return resolve()
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
 * Logout the user (remove the token) and redirect him to the login page.
 * @param {Object} router - Router object of Vue.
 */
function logout (router) {
  if (!router) throw new Error('Router must be provided to call this function.')
  token.remove()
  router.push({name: 'login'})
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
 * @param {String} data.legalRepEmail
 * @param {String} data.legalRepPhone
 * @param {Array<String>} data.industries
 * @param {String} data.password
 * @returns {Promise<void>}
 */
async function register (data) {
  const generalError = new Error('Tuvimos un error procesando el registro, por favor intenta nuevamente más tarde.')
  const company = {
    businessName: data.businessName,
    fantasyName: data.fantasyName,
    rut: data.rut,
    industries: data.industries,
    legalRepresentative: data.legalRepresentative,
    legalRepEmail: data.legalRepEmail,
    legalRepPhone: data.legalRepPhone
  }
  const user = {
    email: data.email,
    name: data.name,
    password: data.password
  }
  return new Promise((resolve, reject) => {
    /* REGISTER COMPANY FIRST */
    axios.post(getRouteWithToken(routes.companies), company)
      .then(res => {
        if (res.data.error) throw generalError
        else if (res.data.id) return res.data.id
        else throw generalError
      })
      .then(companyId => {
        /* REGISTER USER */
        user.company = companyId
        return axios.post(getRouteWithToken(routes.users), user)
      })
      .then(res => {
        if (res.data.error) throw generalError
        else {
          resolve()
          token.remove()
        }
      })
      .catch(() => reject(generalError))
  })
}

/**
 * Check if the user is logged in the site and returns a boolean.
 * @return {boolean}
 */
function isLoggedIn () {
  return !!token.get()
}

/**
 * Check if email exists in database. If not register it.
 * @param email
 * @returns {Promise<any>}
 */
function registerProvider (name, rut, email) {
  return new Promise((resolve, reject) => {
    // Simulate an api call with a timeout of two seconds that resolves or reject the promise with equal probability.
    setTimeout(() => {
      // En esta version dummy no se discrimina cual campo genero el error
      Math.random() > 0.7
        ? resolve('Agregando proveedor')
        : reject(new Error(`Proveedor existente`))
    }, 500)
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
   * Removes the token from the local storage.
   * @return {void}
   */
  remove: () => localStorage.removeItem(TOKEN_NAME)
}

export default {
  isLoggedIn,
  isShadowUser,
  login,
  logout,
  register,
  registerProvider
}
