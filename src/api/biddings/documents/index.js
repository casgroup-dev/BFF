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
async function putDocument (biddingId, type, name, url) {
  const endpoint = getRouteWithToken(routes.biddingDocuments(biddingId, type))
  return axios.put(endpoint, {name, url}).then(res => {
    if (res.data.error) throw new Error(res.data.error.message)
  })
}

export default {
  putDocument
}
