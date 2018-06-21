<template>
  <card>
    <template slot="header">
      <h4>Editar perfil</h4>
    </template>
    <div class="row">
      <div class="col-md-6 pr-1">
        <div class="form-group">
          <label>Razón social</label>
          <input class="form-control" disabled="" placeholder="Company" v-model=businessName type="text">
        </div>
      </div>
      <div class="col-md-6 pl-1">
        <div class="form-group">
          <label>Nombre de fantasía</label>
          <input class="form-control" disabled="" placeholder="Company" v-model=fantasyName type="text">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-1">
        <div class="form-group">
          <label>rut</label>
          <input class="form-control" placeholder="12.345.678-k" v-model=newRut type="text">
        </div>
      </div>
      <div class="col-md-6 pl-1">
        <div class="form-group">
          <label>Rubros</label>
          <input class="form-control" placeholder="Cría de aves de corral, venta de trigo" v-model=newIndustries
                 type="text">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 pr-1">
        <div class="form-group">
          <label>Representante Legal</label>
          <input class="form-control" placeholder="Pepito de los Palotes" v-model=newLegalRepresentative type="text">
        </div>
      </div>
      <div class="col-md-4 px-1">
        <div class="form-group">
          <label>Email representante legal</label>
          <input class="form-control" placeholder="pepito.palotes@gmail.com" v-model=newLegalRepEmail type="text">
        </div>
      </div>
      <div class="col-md-4 pl-1">
        <div class="form-group">
          <label>Teléfono representante legal</label>
          <input class="form-control" placeholder="+569 84847070" v-model=newLegalRepPhone type="text">
        </div>
      </div>
    </div>
    <button class="btn btn-info btn-fill pull-right" @click="updateProfile">
      Actualizar perfil
    </button>
    <template>
    </template>
  </card>
</template>

<script>
  import Card from 'src/components/UIComponents/Cards/Card'

  export default {
    name: 'CompanyProfile',
    components: {
      Card
    },
    data () {
      // Acá van los campos editables
      return {
        newRut: this.rut,
        newIndustries: this.industries,
        newLegalRepresentative: this.legalRepresentative,
        newLegalRepEmail: this.legalRepEmail,
        newLegalRepPhone: this.legalRepPhone
      }
    },
    props: {
      businessName: {
        type: String,
        default: 'CAS Group SA'
      },
      fantasyName: {
        type: String,
        default: 'CAS Group'
      },
      rut: {
        type: String,
        default: '12.345.678-k'
      },
      industries: {
        type: Array,
        default: () => ['asesorias, sourcing, abastecimiento ']
      },
      legalRepresentative: {
        type: String,
        default: 'Cristian Saavedra'
      },
      legalRepEmail: {
        type: String,
        default: 'csaavedra@casgroup.cl'
      },
      legalRepPhone: {
        type: String,
        default: '+569 54326789'
      }
    },
    methods: {
      updateProfile: () => {
        console.log(this.newRut)
      }
    }
  }
</script>

<style scoped>

</style>
