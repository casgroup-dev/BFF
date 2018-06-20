<template>
  <card>
    <h3 class="title">{{ item.itemName }}</h3>
    <h5 class="title">Cantidad deseada: <strong>{{ item.wantedAmount }}</strong> | Unidad de medida: <strong>{{
      item.measureUnit }}</strong></h5>
    <table class="table" v-if="offers && offers.length">
      <thead>
      <tr>
        <th>Proveedor</th>
        <th>Precio unitario</th>
        <th>Especificaciones</th>
        <th>Total</th>
        <th>Adjudicar</th>
        <th>Comentario</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(offer, index) in orderedOffers" :key="index">
        <td>{{ offer.provider }}</td>
        <td>${{ offer.costPerUnit }}</td>
        <td>{{ offer.specifications }}</td>
        <td>${{ offer.totalCost }}</td>
        <td>
          <p-checkbox v-model="offer.selected"/>
        </td>
        <td>
          <fg-input v-model="offer.comment"/>
        </td>
      </tr>
      </tbody>
    </table>
    <!-- Message if there are no offers -->
    <h3 class="text-center" v-else>No hay ofertas que mostrar para el item '{{ item.itemName }}'.</h3>
    <!-- Adjudicate button -->
    <div class="row text-center">
      <div class="col">
        <button class="btn btn-primary" @click="emitAdjudicateEvent">
          <i class="fa fa-check"></i> Guardar
        </button>
      </div>
    </div>
  </card>
</template>

<script>
  import Card from '../../../../../UIComponents/Cards/CardV2'
  import PCheckbox from '../../../../../UIComponents/Inputs/Checkbox'

  export default {
    components: {
      PCheckbox,
      Card
    },
    props: {
      /**
       * Item to show comparison between providers.
       */
      item: {
        itemName: String,
        wantedAmount: Number,
        measureUnit: String
      },
      /**
       * Offers of the providers.
       */
      offers: Array
    },
    computed: {
      /**
       * Order the offers by the total cost.
       */
      orderedOffers () {
        if (!this.offers) return []
        return this.offers
          .map(offer => ({...offer, totalCost: offer.costPerUnit * this.item.wantedAmount}))
          .sort((a, b) => a.totalCost - b.totalCost)
      }
    },
    methods: {
      /**
       * Emit an 'adjudicate' event with the item's name and the list of the providers with its
       * correspondent comment and a boolean indicating if the provider has adjudicated the item or not.
       */
      emitAdjudicateEvent () {
        const offers = this.orderedOffers.map(o => ({
          adjudicated: o.selected,
          comment: o.comment,
          provider: o.provider
        }))
        this.$emit('adjudicate', this.item.itemName, offers)
      }
    }
  }
</script>

<style scoped src="../assets/title.css"></style>
