import axios from 'axios'
import routesManager from '../../routes'

const {routes, getRouteWithToken} = routesManager

function uploadEconomicalForm (biddingId, items) {
  const endpoint = getRouteWithToken(routes.forms(biddingId, 'economical'))
  return axios.put(endpoint, items).then(res => {
    if (res.data.error) throw new Error(res.data.error.message)
  })
}

export default {
  uploadEconomicalForm
}
