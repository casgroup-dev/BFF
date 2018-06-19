import axios from 'axios'
import routesUtils from './routes/index'
import token from './token/index'

const {endpoint, getRouteWithToken, routes} = routesUtils

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
 * Obtains every company
 * @returns {Promise<any>}
 */
function getCompanies () {
  const generalError = new Error('Error de conexion.')
  return new Promise((resolve, reject) => {
    axios.get(getRouteWithToken(routes.companies))
      .then(res => {
        if (res.data.error && res.data.error.status === 403) {
          return reject(new Error('No autorizado'))
        } else if (res.data.error && res.data.error.status === 404) {
          return reject(new Error('No encontrado'))
        } else {
          return resolve(res.data)
        }
      })
      .catch(() => reject(generalError))
  })
}

/**
 * Obtains every bidding that the user is allowed to see
 * @returns {Promise<any>}
 */
function getBiddings () {
  return new Promise((resolve, reject) => {
    const generalError = new Error('Error de conexion.')
    axios.get(getRouteWithToken(routes.biddings))
      .then(res => {
        if (res.data.error && res.data.error.status === 403) {
          return reject(new Error('No autorizado'))
        } else if (res.data.error && res.data.error.status === 404) {
          return reject(new Error('No encontrado'))
        } else {
          return resolve(res.data)
        }
      })
      .catch(() => reject(generalError))
  })
}

/** Obtains the information of the selected bidding to fill the dashboard
* @returns {Promise<any>}
* @returns {Promise<any>}
*/
async function getCurrentBidding (id) {
  return new Promise((resolve, reject) => {
    const generalError = new Error('Error de conexion.')
    axios.get(getRouteWithToken(routes.biddings + '/' + id))
      .then(res => {
        if (res.data.error && res.data.error.status === 403) {
          return reject(new Error('No autorizado'))
        } else if (res.data.error && res.data.error.status === 404) {
          return reject(new Error('No encontrado'))
        } else {
          return resolve(res.data)
        }
      })
      .catch(() => reject(generalError))
  })
}

/**
 * Check if an user is allowed to access the industries. If it is, it returns the industries. Else, it returns an error.
 * @returns {Promise<any>}
 */
function getIndustries () {
  const generalError = new Error('Error de conexion.')
  return new Promise((resolve, reject) => {
    axios.get(getRouteWithToken(routes.industries))
      .then(res => {
        if (res.data.error && res.data.error.status === 403) {
          return reject(new Error('No autorizado'))
        } else if (res.data.error && res.data.error.status === 404) {
          return reject(new Error('No encontrado'))
        } else {
          return resolve(res.data)
        }
      })
      .catch(() => reject(generalError))
  })
}

/**
 *
 * @param providers {Array} Providers that need to receive the invitation
 * @param bidding {Object} The bidding that the providers will be invited to
 */
function invitationsToBidding (providers, bidding) {
  return new Promise((resolve, reject) => {
    // Simulate an api call with a timeout of one seconds that resolves or reject the promise with equal probability.
    setTimeout(() => {
      resolve()
    }, 1000)
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
async function registerProvider (name, rut, email) {
  if (!email) throw new Error('Mail is mandatory.')
  const data = {email}
  if (name) data.name = name
  if (rut) data.rut = rut
  return axios.post(getRouteWithToken(routes.shadowUsers), data).then(res => {
    if (res.data.error) throw new Error('Lo sentimos, intente más tarde.')
  })
}

/**
 * Check if email exists in database.
 * @param email
 * @returns {Promise<any>}
 */
async function checkEmail (email) {
  if (!email) {
    throw new Error('Mail is mandatory.')
  }
  return axios.get(getRouteWithToken(routes.usersMail(email))).then(res => {
    return !res.data.error
  })
}

function buildBidding(bidding) {
  if (!bidding.name) throw new Error('No name assigned.')
  if (!bidding.company) throw new Error('No company assigned.')
  if (!bidding.users) throw new Error('No users assigned.')
  if (!bidding.stages) throw new Error('No stages defined.')
  if (!bidding.items) throw new Error('No items defined.')
  const data = {
    title: bidding.name,
    bidderCompany: bidding.company,
    users: (function () {
      let result = []
      for (let i = 0; i < bidding.users.length; ++i) {
        let user = bidding.users[i]
        let temp = {
          email: user.mail,
          role: 'client'
        }
        result.push(temp)
      }
      return result
    })(),
    rules: bidding.rules,
    biddingType: bidding.type,
    economicalForm: bidding.items,
    deadlines: (function () {
      let dictionary = {}
      let stage
      for (let i = 0; i < bidding.stages.length; ++i) {
        stage = bidding.stages[i]
        if (stage.save_name === 'results') {
          dictionary[stage.save_name] = stage.start
        } else {
          dictionary[stage.save_name] = {
            start: stage.start,
            end: stage.end
          }
        }
      }
      return dictionary
    })()
  }
  return data
}

/**
 * Creates a bidding
 * @param bidding
 * @returns {Promise<any>}
 */
async function registerBidding (bidding) {
  const data = buildBidding(bidding)
  return axios.post(getRouteWithToken(routes.biddings), data).then(res => {
    if (res.data.error) throw new Error('Lo sentimos, intente más tarde.')
  })
}

/**
 * Updates a bidding
 * @param bidding
 * @returns {Promise<any>}
 */
async function updateBidding (bidding, loadedBidding) {
  let data = buildBidding(bidding)
  data.id = loadedBidding.id
  for (let i = 0; i < loadedBidding.users.length; ++i) {
    let user = loadedBidding.users[i]
    data.users.push({
      email: user.user.email,
      role: user.role
    })
  }
  console.log(data)
  return axios.put(getRouteWithToken(routes.biddings), data).then(res => {
    console.log(res.data.error)
    if (res.data.error) throw new Error('Lo sentimos, intente más tarde.')
  })
}

/**
 * Register a new client for bidding
 * @param {Object} data
 * @param {String} data.email
 * @param {String} data.password
 * @returns {Promise<void>}
 */
async function registerClient (data) {
  const generalError = new Error('Tuvimos un error procesando el registro de cliente, por favor intenta nuevamente más tarde.')
  const user = {
    email: data.email,
    password: data.password
  }
  return axios.post(getRouteWithToken(routes.users), user).then(res => {
    if (res.data.error) throw generalError
  })
}

/**
 * Returns a promise that resolves with the signed url to put the object in S3 and the url where the object will reside.
 * @param {String} fileName
 * @param {String} contentType
 * @returns {Promise<AxiosResponse<Object>>}
 */
function getSignedUrlToPutObject (fileName, contentType) {
  return axios.get(getRouteWithToken(routes.signPutObject) + `&fileName=${fileName}&contentType=${contentType}`)
    .then(res => {
      if (res.data.signedRequest && res.data.url) return res.data
      if (res.data.error) throw new Error('Problem with the request to sign the url to put an object.')
    })
}

function participateInBidding (id) {
  console.log(routes.biddings + '/' + id + '/participate')
  return axios.post(getRouteWithToken(routes.biddings + '/' + id + '/participate'))
    .then(res => {
      if (res.data.error) throw new Error(res.data.error)
      return {}
    })
    .catch(err => {
      throw new Error('Could not make participate api call.')
    })
}

export default {
  isLoggedIn,
  isShadowUser,
  login,
  logout,
  register,
  registerProvider,
  getCompanies,
  getBiddings,
  getCurrentBidding,
  getIndustries,
  invitationsToBidding,
  getSignedUrlToPutObject,
  checkEmail,
  registerClient,
  registerBidding,
  updateBidding,
  participateInBidding
}
