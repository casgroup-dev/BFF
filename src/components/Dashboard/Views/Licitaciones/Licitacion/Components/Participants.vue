<template>
  <div class="content">
    <stats-card class="stats-card">
      <div slot="header" @click="showParticipantsModal">
        <i class="fa fa-users"></i>
      </div>
      <div slot="content">
        <p>Proveedores Participantes</p>{{ amountProviders() }}
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
              <th v-for="(attr, index) in tableColumns" :key="index" scope="col">
                {{attr}}
              </th>
            </tr>
            </thead>
            <!-- BODY -->
            <tbody>
            <tr v-for="(provider, index) in participants" v-if="provider.role === 'provider'" :key="index" style="font-weight:normal">
              <!-- PROVIDER ATTRIBUTES -->
              <td>{{provider.user.company.businessName}}</td>
              <td>{{provider.user.email}}</td>
              <td>{{provider.user.phone}}</td>
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

  export default {
    data() {
      return {
        tableColumns: ['Razón social', 'Email admin proveedor', 'Teléfono admin proveedor'],
        showParticipants: false
      }
    },
    components: {
      StatsCard,
      Modal,
      LTable
    },
    props: {
      title: {
        type: String,
        default: 'Insert title here'
      },
      titleSize: {
        type: String,
        default: '30px'
      },
      participants: {
        type: Array,
        required: true,
        default: () => [
          {
            user: {
              email: 'admin1@mail.com',
              phone: '+56912345678',
              company: {
                businessName: 'Entel PCS'
              }
            }
          },
          {
            user: {
              email: 'admin2@mail.com',
              phone: '+56913579135',
              company: {
                businessName: 'CTC SA'
              }
            }
          },
          {
            user: {
              email: 'admin3@mail.com',
              phone: '+56924680246',
              company: {
                businessName: 'Vodafone LTDA'
              }
            }
          }
        ]
      }
    },
    methods: {
      amountProviders: function () {
        let amount = 0
        let user
        for (let i = 0; i < this.participants.length; ++i) {
          user = this.participants[i]
          if (user.role === 'provider') ++amount
        }
        return amount
      },
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
  .stats-card {
    margin: 0;
    height: 100%;
  }

  .content {
    margin: 5px;
  }

  .fa-users {
    color: lightseagreen;
  }

  .fa-users:hover {
    color: #bb0502;
    cursor: pointer;
  }
</style>
