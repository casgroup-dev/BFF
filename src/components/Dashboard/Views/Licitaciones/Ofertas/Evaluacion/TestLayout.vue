<template>
  <layout v-if="bidding" :bidding="bidding" show-economical-section/>
</template>

<script>
  import axios from 'axios'
  import routes from '../../../../../../api/routes'
  import Layout from './Layout'

  export default {
    components: {
      Layout
    },
    data () {
      return {
        bidding: null
      }
    },
    created () {
      const id = '5b22c5394009b26656d4656c'
      axios.get(routes.getRouteWithToken(routes.routes.bidding(id)))
        .then(res => {
          if (res.data.error) return console.error(res.data.error.message)
          this.bidding = res.data
          console.log(this.bidding)
        })
    }
  }
</script>

<style scoped>

</style>
