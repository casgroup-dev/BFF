<template>
  <Card>
    <!-- TITLE AND GENERAL ERRORS -->
    <h2 slot="header" class="title text-center">Registro de usuario</h2>
    <!-- DISABLED INPUTS (PASSED BY PROPS) -->
    <fg-input disabled :placeholder="email" label="Email"/>
    <!-- TEXT INPUTS -->
    <fg-input v-for="(input, index) in inputs.text" :key="index"
              :placeholder="input.placeholder" v-model="input.payload"
              @enter="register">
      <label slot="label" :class="`control-label ${input.error ? 'error' : ''}`">{{ input.label }}</label>
    </fg-input>
    <!-- DROP DOWNS -->
    <div>
      <label class="typo__label">Rubros</label>
      <multiselect v-model="inputs.dropDowns.industries.values" :options="inputs.dropDowns.industries.options" :multiple="true" :close-on-select="false" :clear-on-select="true" :hide-selected="true" :preserve-search="false" placeholder="Selecciones sus rubros" label="name" track-by="name" :preselect-first="true">
        <template slot="tag" slot-scope="props"><span class="custom__tag"><span>{{ props.option.name }}</span><span class="custom__remove" @click="props.remove(props.option)">❌<br></span></span></template>
      </multiselect>
    </div>
    <!-- TODO: With modal of Seba Puja and checkboxes filtered by a search field, it is its own component -->
    <!-- PASSWORDS -->
    <fg-input v-for="(input, index) in inputs.passwords" :key="index"
              type="password" v-model="input.payload" @enter="register">
      <label slot="label" :class="`control-label ${input.error ? 'error' : ''}`">{{ input.label }}</label>
    </fg-input>
    <!-- FOOTER -->
    <div class="col-12 align-center">
      <label v-if="thereAreFormErrors" class="control-label">
        Hay problemas en su registro, por favor ingrese todos los
        campos que se encuentran destacados en rojo.
      </label>
      <label v-if="differencePasswordsError" class="control-label error">Las contraseñas no son iguales.</label>
      <label v-if="success" class="control-label success">Ha realizado con éxito su registro, redireccionando.</label>
      <label v-if="registerError" class="control-label error">
        Hemos tenido problemas procesando su registro, por favor
        inténtelo nuevamente más tarde.
      </label>
      <br>
      <button v-if="!loading" class="btn btn-info btn-fill" @click="register">Registrar</button>
      <clip-loader :loading="loading" color="#1DC7EA"/>
      <br>
      <router-link :to="{ name: 'login', query: {next: this.$route.query.next}}">
        <div style="margin-top: 10px;">¿Ya tienes cuenta? Ingresa aquí</div>
      </router-link>
    </div>
  </Card>
</template>

<script>
  import Card from '../../UIComponents/Cards/Card'
  import usersApi from '../../../apis/users'
  import ClipLoader from 'vue-spinner/src/ClipLoader'
  import Multiselect from 'vue-multiselect'

  export default {
    props: {
      email: {type: String, required: true}
    },
    data () {
      return {
        inputs: {
          /* TEXT INPUTS */
          text: {
            name: {label: 'Nombre', placeholder: 'Juan Lopez Carrera', payload: null, error: false},
            businessName: {label: 'Razón social', placeholder: 'CasGroup', payload: null, error: false},
            fantasyName: {label: 'Nombre de fantasía', placeholder: 'CasGroup', payload: null, error: false},
            rut: {label: 'RUT de empresa', placeholder: '90193000-7', payload: null, error: false},
            legalRepresentative: {
              label: 'Representante legal',
              placeholder: 'Ernesto Tapia Herrera',
              payload: null,
              error: false
            },
            legalRepresentativeEmail: {
              label: 'Email del representante legal',
              placeholder: 'ejemplo@email.com',
              payload: null,
              error: false
            },
            legalRepresentativePhone: {
              label: 'Teléfono del representante legal',
              placeholder: '+56912345678',
              payload: null,
              error: false
            }
          },
          /* DROP DOWN INPUTS */
          dropDowns: {
            industries: {
              options: [],
              values: [],
              error: false
            }
          },
          /* PASSWORD INPUTS */
          passwords: {
            first: {label: 'Contraseña', payload: null, error: false},
            confirmation: {label: 'Confirmación de contraseña', payload: null, error: false}
          }
        },
        /* General errors, not associated to a single input */
        differencePasswordsError: false,
        thereAreFormErrors: false,
        registerError: null,
        success: false,
        /* General flags */
        loading: false
      }
    },
    /* OTHER COMPONENTS USED IN THIS COMPONENT */
    components: {
      Card,
      ClipLoader,
      Multiselect
    },
    /* METHODS/FUNCTIONS OF THIS COMPONENT */
    methods: {
      /**
       * Validates the form, check for non empty values.
       */
      validateForm () {
        this.thereAreFormErrors = false
        /* Text fields, must contain text */
        for (let key of Object.keys(this.inputs.text)) {
          const input = this.inputs.text[key]
          if (!input.payload) this.thereAreFormErrors = input.error = true
          else input.error = false
        }
        /* Drop downs: At least one must be selected */
        for (let key of Object.keys(this.inputs.dropDowns)) {
          const dropDown = this.inputs.dropDowns[key]
          // TODO: Uncomment this when the dropdowns are ready
          if (dropDown.options.selected.length === 0) this.thereAreFormErrors = dropDown.error = true
          else dropDown.error = false
        }
        /* Passwords: Must contain same text */
        const passwords = this.inputs.passwords
        if (!passwords.first.payload) this.thereAreFormErrors = passwords.first.error = true
        else passwords.first.error = false
        if (!passwords.confirmation.payload) this.thereAreFormErrors = passwords.confirmation.error = true
        else passwords.confirmation.error = false
        if (passwords.first.payload !== passwords.confirmation.payload) this.thereAreFormErrors = this.differencePasswordsError = true
        else this.differencePasswordsError = false
        /* RETURN TRUE IF THERE ARE NO ERRORS */
        return !this.thereAreFormErrors
      },
      getIndustries () {
        return usersApi.getIndustries()
      },
      /**
       * Check that the data of the form is filled (not empty values) and call the register API.
       */
      async register () {
        if (this.validateForm()) {
          this.loading = true
          const self = this
          usersApi.register({
            name: this.inputs.text.name.payload,
            email: this.email,
            businessName: this.inputs.text.businessName.payload,
            fantasyName: this.inputs.text.fantasyName.payload,
            rut: this.inputs.text.rut.payload.replace(/[.-]/g, ''),
            legalRepresentative: this.inputs.text.legalRepresentative.payload,
            legalRepEmail: this.inputs.text.legalRepresentativeEmail.payload,
            legalRepPhone: this.inputs.text.legalRepresentativePhone.payload,
            // industries: this.inputs.dropDowns.industries.options.filter(opt => opt.selected).map(opt => opt.label),
            // TODO: Uncomment industries when the drop down is working
            password: this.inputs.passwords.first.payload
          })
            .then(function () {
              self.success = true
              /* Wait two seconds a redirect */
              setTimeout(() => self.$router.push(self.$route.query.next || {name: 'home'}), 2000)
            })
            .catch(err => {
              self.registerError = err.message
              self.loading = false
            })
        }
      },
      /**
       * Focus the first input element of the form.
       */
      focus () { this.$el.querySelector('input').focus() }
    },
    /* HOOKS OF THE COMPONENT */
    created: function () {
      const self = this
      usersApi.getIndustries().then(data => {
        var allIndustries = []
        return Promise.all(data.map(current => {
          allIndustries = allIndustries.concat(current.industries)
          return current
        })).then(() => { self.inputs.dropDowns.industries.options = allIndustries })
          .catch(err => {
            console.error(err)
          })
      })
    }
    // mounted: function () { this.focus() }
  }

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
  label.error {
    color: #ff0000
  }

  label.success {
    color: #0ab961
  }

  .align-center {
    text-align: center;
  }
</style>
