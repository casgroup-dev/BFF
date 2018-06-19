<template>
  <card>
    <template slot="header">
      <h3>Resultados</h3>
    </template>
    <template>
      <div class="row" style="align-items: center">
        <i :class="`col-2 fa ${statusIcon(awarded)} fa-5x pull-right`"></i>
        <div class="col-9">
          {{ awardStatus(awarded) }}
        </div>
      </div>
      <div v-if="awardComment" class="text" style="border: black 2px solid; border-radius: 4px">
        {{ awardComment }}
      </div>
    </template>
    <template slot="footer">
      <div class="btn btn-primary" @click="showDetails = !showDetails">
        Ver detalles
      </div>
    </template>
    <modal v-show="showDetails">
      <template slot="header">
        <h3>Detalles de adjudicación</h3>
      </template>
      <template slot="body">
        <table class="table table-bordered">
          <thead>
          <th>Ítem o servicio</th>
          <th>Comentario del evaluador</th>
          <th>¿Adjudicado?</th>
          </thead>
          <tr v-for="(detail, index) in details" :key="index">
            <td>{{detail.itemName}}</td>
            <td>{{detail.adminComment}}</td>
            <td><p-checkbox v-model="detail.adjudicated" :disabled="disabled"></p-checkbox></td>
          </tr>
        </table>
        <!--<table class="table table-bordered">
          <thead>
            <th>Ítem o servicio</th>
            <th>Comentario del evaluador</th>
          </thead>
          <tr>
            <td>Pernos</td>
            <td>Me gustan tus pernos :)</td>
          </tr>
          <tr>
            <td>Lápices</td>
            <td>Solo te compro 200 unidades :/</td>
          </tr>
        </table>-->
      </template>
      <template slot="footer">
        <div class="btn btn-finish" @click="showDetails = !showDetails">Cerrar</div>
      </template>
    </modal>
  </card>
</template>

<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import Modal from 'src/components/UIComponents/Modal/Modal'
  import PCheckbox from '../../../../../UIComponents/Inputs/Checkbox';

  export default {
    name: 'Results',
    data: function () {
      return {
        showDetails: false
      }
    },
    components: {
      PCheckbox,
      Modal,
      Card
    },
    props: {
      awarded: {
        type: Boolean,
        default: true
      },
      awardComment: {
        type: String,
        default: ''
      },
      details: {
        type: Array,
        default: () => [{itemName: '', adminComment: '', adjudicated: false}]
      }
    },
    methods: {
      awardStatus: (awarded) => {
        if (awarded) {
          return 'Felicitaciones tu compañia se ha adjudicado esta licitación.'
        }
        else {
          return 'Lo sentimos, no te has adjudicado ningún ítem.'
        }
      },
      statusIcon: (awarded) => {
        if (awarded) {
          return 'fa-trophy'
        }
        else {
          return 'fa-frown-o'
        }
      }
    }

  }
</script>

<style scoped>

  .card {
    width: -moz-fit-content;
    text-align: center;
  }

  .fa-trophy {
    color: gold;
    text-shadow: 5px 0px #848484;
  }

  .fa-frown-o {
    color: brown;
  }

</style>
