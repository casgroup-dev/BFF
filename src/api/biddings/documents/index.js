import axios from 'axios'
import routesManager from '../../routes'

const {routes, getRouteWithToken} = routesManager

/**
 * Send the name and url of the uploaded file to correspondent bidding.
 * @params {String} biddingId - Id of the bidding.
 * @params {String} type - Type of the document. Current options are: 'economical' and 'technical'.
 * @params {String} name - Name of the file.
 * @params {String} url - URL of the file to download from.
 * @returns {Promise<void>}
 */
function putDocument (biddingId, type, name, url) {
  const endpoint = getRouteWithToken(routes.biddingDocuments(biddingId, type))
  return axios.put(endpoint, {name, url}).then(res => {
    if (res.data.error) throw new Error(res.data.error.message)
  })
}

/**
 * Get the files uploaded by the user to the given bidding.
 * @param {String} biddingId - Identifier of the bidding.
 * @returns {Promise<Object>}
 */
function getMyFiles (biddingId) {
  const endpoint = getRouteWithToken(routes.biddingDocuments(biddingId))
  return axios.get(endpoint).then(res => {
    if (res.data.error) throw new Error(res.data.error.message)
    return res.data
  })
}

export default {
  getMyFiles,
  putDocument
}
