import axios from 'axios'
import routesManager from '../../routes'

const {routes, getRouteWithToken} = routesManager

const types = {economically: 'economically', technically: 'technically'}

function approve (biddingId, type, data) {
  const endpoint = getRouteWithToken(routes.approve(biddingId, type))
  return axios.put(endpoint, data).then(res => {
    if (res.data.error) throw new Error(res.data.error.message)
  })
}

export default {
  approve,
  types
}
