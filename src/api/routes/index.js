import token from '../token/index'

let endpoint = window.location.origin + '/api'
if (endpoint.includes('localhost')) endpoint = 'http://localhost:3000/api'
const routes = {
  companies: '/companies',
  login: '/auth/login',
  shadowUsers: '/shadow/users',
  users: '/users',
  industries: '/industries',
  signPutObject: '/auth/sign/put',
  biddings: '/biddings',
  bidding: id => `${routes.biddings}/${id}`,
  biddingDocuments: (biddingId, type) => `${routes.biddings}/${biddingId}/documents${type ? `/${type}` : ''}`,
  forms: (biddingId, type) => `${routes.biddings}/${biddingId}/forms/${type}`
}

/**
 * Returns the correct route with the token of the user.
 * @param route
 * @returns {string}
 */
function getRouteWithToken (route) {
  return `${endpoint + route}?token=${token.get()}`
}

export default {
  endpoint,
  getRouteWithToken,
  routes
}
