<template>
  <card class="container-fluid">
    <div class="row text-center">
      <div class="col"><h3 class="title">Cuadro comparativo</h3></div>
    </div>
    <item-comparison-table v-for="(itemAndOffers, index) in itemsAndOffers"
                           :key="index"
                           :item="itemAndOffers.item"
                           :offers="itemAndOffers.offers"
                           @adjudicate="emitAdjudicate"/>
    <!-- Message if there are no items -->
    <div class="text-center" v-if="!items.length"><h4>No hay items que mostrar.</h4></div>
  </card>
</template>

<script>
  import Card from '../CardV2'
  import ItemComparisonTable from './ItemComparisonTable'

  export default {
    components: {
      Card,
      ItemComparisonTable
    },
    props: {
      items: {
        type: Array,
        default: () => []
      },
      offers: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      /**
       * Join the the items and its correspondent offers.
       */
      itemsAndOffers () {
        return this.items.map(item => ({item, offers: this.offers.filter(offer => offer.itemName === item.itemName)}))
      }
    },
    methods: {
      emitAdjudicate (itemName, providers) {
        this.$emit('adjudicate', itemName, providers)
      }
    }
  }
</script>

<style scoped src="../assets/title.css"></style>
<style scoped>

</style>
