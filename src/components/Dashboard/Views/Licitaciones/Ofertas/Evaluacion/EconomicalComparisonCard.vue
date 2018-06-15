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
    <div class="text-center" v-if="!economicalForm.length"><h4>No hay items que mostrar.</h4></div>
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
      economicalForm: {
        type: Array,
        default: () => []
      },
      economicalFormAnswers: {
        type: Array,
        default: () => []
      },
      users: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      /**
       * Join the the items and its correspondent offers.
       * The component needs to have the item following the schema from 'economicalForm' as
       * {itemName: String, wantedAmount: Number, measureUnit: String}
       * and the offers for that item from each provider following the schema from 'economicalFormAnswers' as
       * {itemName: String, specifications: String, costPerUnit: Number}.
       * Also, the offer is 'selected' and has a 'comment' that we can find in any user of the company in the
       * 'approved.economically' array that has objects as {itemName: String, comment: String}.
       * So, to make the offer selected and get the comment we extracted the information from any user of the same
       * company as the economicalFormAnswer.
       */
      itemsAndOffers () {
        return this.economicalForm.map(item => ({
          item,
          offers: this.economicalFormAnswers
            .filter(offer => offer.itemName === item.itemName)
            .map(offer => {
              if (offer.adjudicated) offer.selected = true
              if (offer.adminComment) offer.comment = offer.adminComment
              return offer
            })
        }))
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
