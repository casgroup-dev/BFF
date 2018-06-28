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
        <th>#</th>
        <th>Item</th>
        <th>Unidad medida</th>
        <th>Cantidad</th>
        <th>Precio unitario (CLP)</th>
        <th>Especificaciones (Opcional)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item.itemName }}</td>
        <td>{{ item.measureUnit }}</td>
        <td>{{ item.wantedAmount }}</td>
        <td>
          <fg-input v-model="item.costPerUnit" class="amount-input no-margin"/>
        </td>
        <td>
          <fg-input v-model="item.specifications" class="no-margin"/>
        </td>
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
  import api from '../../../../../../api/biddings/economical-form'
  import Modal from '../../../../../UIComponents/Modal/Modal'

  export default {
    components: {
      Modal
    },
    data () {
      return {
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
      },
      /**
       * Items of the bidding to populate economical form. Array with objects as:
       * {itemName: String, measureUnit: String, wantedAmount: Number}
       * And optional properties (if the user already has send an economical form):
       * - costPerUnit: Number
       * - specifications: String
       */
      items: {
        type: Array
      }
    },
    methods: {
      emitClose () {
        this.$emit('close')
      },
      /**
       * Upload the filled form to the backend.
       */
      uploadForm () {
        for (let item of this.items) {
          if (!item.costPerUnit || !Number(item.costPerUnit)) {
            return alert('Debes ingresar el precio unitario en todos los items.')
          }
        }
        api.uploadEconomicalForm(this.biddingId, this.items).then(this.notifySuccess).catch(this.notifyError)
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
      notifyError (err) {
        console.error(err)
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

  .no-margin {
    margin: 0;
  }

  .amount-input {
    width: 150px;
  }
</style>
