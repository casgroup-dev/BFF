<template>
  <modal width="75%">
    <!-- HEADER -->
    <div class="header" slot="header">
      <h3 class="title">Tabla oferta económica</h3>
      <button class="btn btn-simple" @click="emitClose"><i class="fa fa-times"></i></button>
    </div>
    <!-- TABLE -->
    <table slot="body" class="table mb-auto" v-if="items.length">
      <thead>
      <tr>
        <th class="text-center">#</th>
        <th class="text-center">Item</th>
        <th class="text-center">Unidad medida</th>
        <th class="text-center">Cantidad</th>
        <th class="text-center">Precio unitario (CLP)</th>
        <th class="text-center">Total</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item.itemName }}</td>
        <td>{{ item.measureUnit }}</td>
        <td>
          <fg-input v-model="item.quantity" class="amount-input"/>
        </td>
        <td>
          <fg-input v-model="item.costPerUnit" class="amount-input"/>
        </td>
        <td>${{ item.quantity * item.costPerUnit || 0}}</td>
      </tr>
      </tbody>
    </table>
    <div slot="body" v-else>
      <h3 class="title mb-auto">Hubo un error, por favor refresca la página.</h3>
    </div>
    <!-- FOOTER -->
    <div slot="footer" class="text-center">
      <button class="btn btn-wd btn-success" @click="uploadForm"><i class="fa fa-upload"></i> Subir oferta</button>
      <button class="btn btn-wd" @click="emitClose">Cerrar</button>
    </div>
  </modal>
</template>

<script>
  import Modal from '../../../../../UIComponents/Modal/Modal'

  export default {
    components: {
      Modal
    },
    data () {
      return {
        items: [],
        baseNotification: {
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          timeout: 20000
        }
      }
    },
    props: {
      /**
       * Identifier of the current bidding.
       */
      biddingId: {
        type: String,
        required: true
      }
    },
    /**
     * When the component is created, try to get the items from the backend to fill the table.
     */
    created () {
      // TODO: Api call
      this.items = [
        {itemName: 'perno', measureUnit: 'unidad'},
        {itemName: 'tuerca', measureUnit: 'unidad'},
        {itemName: 'lápiz', measureUnit: 'unidad'},
        {itemName: 'condones', measureUnit: 'unidad'}
      ]
    },
    methods: {
      emitClose () {
        this.$emit('close')
      },
      /**
       * Upload the filled form to the backend.
       */
      uploadForm () {
        // TODO: Api call
        this.notifySuccess()
      },
      /**
       * Show a notification indicating that the form was uploaded successfully.
       */
      notifySuccess () {
        this.$notify({
          ...this.baseNotification,
          component: {template: `<span>Fue subida con éxito la oferta económica.</span>`},
          icon: 'fa fa-check',
          type: 'success'
        })
        this.emitClose()
      },
      /**
       * Show a notification as a warning indicating the the form does not uploaded correctly.
       */
      notifyError () {
        this.$notify({
          ...this.baseNotification,
          component: {template: `<span>Ocurrió un problema subiendo la tabla, por favor verifica que tangas conexión a internet.<br>Inténtalo nuevamente.</span>`},
          icon: 'fa fa-exclamation',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped>
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .amount-input {
    width: 150px;
  }
</style>
