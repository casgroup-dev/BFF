import axios from 'axios'
import routesManager from '../../routes'

const {routes, getRouteWithToken} = routesManager

const types = {economically: 'economically'}

function approve (biddingId, type, businessNames, itemName) {
  const endpoint = getRouteWithToken(routes.approve(biddingId, type))
  const data = type === types.economically
    ? {itemName, businessNames}
    : businessNames
  return axios.put(endpoint, data).then(res => {
    if (res.data.error) throw new Error(res.data.error.message)
  })
}

export default {
  approve
}
