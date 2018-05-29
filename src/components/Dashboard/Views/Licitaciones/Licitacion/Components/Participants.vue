<template>
  <div class="content">
    <stats-card>
      <div slot="header" class="icon-success">
        <i v-if="icon" :class="`fa ${icon} icon`" :style="{color: iconColor}"></i>
      </div>
      <div slot="content" class="numbers">
        <p>Participantes</p>{{ participants.length }}
      </div>
      <div slot="footer">
        <button v-if="participants.length" class="btn btn-fill btn-round"
                :style="{backgroundColor: buttonColor}"
                @click="showParticipantsModal()">
          <i class="fa fa-users"></i> Ver Participantes
        </button>
      </div>
    </stats-card>
    <modal v-if="showParticipants">
      <template slot="header">
        <h4 class="no-margin">Participantes</h4>
      </template>
      <template slot="body">
        <div class="table-responsive">
          <table class="table table-hover table-striped">
            <!-- HEADERS -->
            <thead class="thead-light">
            <tr>
              <th v-for="(attr, index) in tableColumns" :key="index" scope="col">{{attr}}</th>
            </tr>
            </thead>
            <!-- BODY -->
            <tbody>
            <tr v-for="(provider, index) in participants" :key="index">
              <!-- PROVIDER ATTRIBUTES -->
              <td v-for="(attr, index) in provider" :key="index">
                <a style="font-weight:normal; color:#262626;">{{attr}}</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template slot="footer">
        <button class="btn btn-round btn-default" @click="cancelModal">
          <span class="btn-label"><i class="fa fa-times"></i></span> Regresar
        </button>
      </template>
    </modal>
  </div>
</template>

<script>
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import Modal from 'src/components/UIComponents/Modal/Modal.vue'
  import LTable from 'src/components/UIComponents/Table.vue'

  const defaultColor = '#02B2A9'
  const emptyArray = []

  export default {
    data () {
      return {
        tableColumns: ['Razón Social', 'Email Admin Proveedor', 'Telefono Admin Proveedor'],
        showParticipants: false
      }
    },

    components: {
      StatsCard,
      Modal,
      LTable
    },

    props: {
      icon: {
        type: String,
        default: 'fa fa-users'
      },
      title: {
        type: String,
        default: 'Insert title here'
      },
      iconColor: {
        type: String,
        default: defaultColor
      },
      buttonColor: {
        type: String,
        default: defaultColor
      },
      titleSize: {
        type: String,
        default: '30px'
      },
      participants: {
        type: Array,
        default: emptyArray
      }
    },

    computed: {

    },

    methods: {
      showParticipantsModal: function () {
        this.showParticipants = true
      },
      cancelModal: function () {
        this.showParticipants = false
      }
    }
  }
</script>

<style scoped>

</style>
