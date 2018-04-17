<template>
  <Card>
    <!-- TITLE AND GENERAL ERRORS -->
    <div class="align-center" slot="header">
      <h2 class="title text-center">Registro de usuario</h2>
      <label v-if="thereAreErrors" class="control-label">
        Hay problemas en su registro, por favor ingrese todos los
        campos que se encuentran detsacados en rojo.
      </label>
      <label v-if="differencePasswordsError" class="control-label error">Las contraseñas no son iguales.</label>
    </div>
    <!-- TEXT INPUTS -->
    <fg-input v-for="(input, index) in inputs.text" :key="index"
              :placeholder="input.placeholder" v-model="input.payload"
              @enter="register">
      <label slot="label" :class="`control-label ${input.error ? 'error' : ''}`">{{ input.label }}</label>
    </fg-input>
    <!-- DROP DOWNS -->
    <!-- PASSWORDS -->
    <fg-input v-for="(input, index) in inputs.passwords" :key="index"
              type="password" v-model="input.payload" @enter="register">
      <label slot="label" :class="`control-label ${input.error ? 'error' : ''}`">{{ input.label }}</label>
    </fg-input>
    <!-- FOOTER -->
    <div class="col-12 align-center">
      <label v-if="thereAreErrors" class="control-label">
        Hay problemas en su registro, por favor ingrese todos los
        campos que se encuentran detsacados en rojo.
      </label>
      <label v-if="differencePasswordsError" class="control-label error">Las contraseñas no son iguales.</label>
      <br>
      <button v-if="!loading" class="btn btn-info btn-fill" @click="register">Registrar</button>
      <clip-loader :loading="loading" color="#1DC7EA"/>
      <br>
      <router-link :to="{ name: 'login', query: {next: this.$route.query.next}}">
        Volver a pantalla de login
      </router-link>
    </div>
  </Card>
</template>

<script>
  import Card from '../../UIComponents/Cards/Card'
  import usersApi from '../../../apis/users'
  import ClipLoader from 'vue-spinner/src/ClipLoader'

  export default {
    data () {
      return {
        inputs: {
          /* TEXT INPUTS */
          text: {
            name: {label: 'Nombre', placeholder: 'Juan Lopez Carrera', payload: null, error: false},
            email: {label: 'Email', placeholder: 'ejemplo@email.com', payload: null, error: false},
            businessName: {label: 'Razón social', placeholder: 'CasGroup', payload: null, error: false},
            fantasyName: {label: 'Nombre de fantasía', placeholder: 'CasGroup', payload: null, error: false},
            rut: {label: 'RUT de empresa', placeholder: '90193000-7', payload: null, error: false},
            legalRepresentative: {
              label: 'Representante legal',
              placeholder: 'Hernesto Tapia Herrera',
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
              options: [
                {label: 'TI', selected: false}
              ],
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
        thereAreErrors: false,
        /* General flags */
        loading: false
      }
    },
    /* OTHER COMPONENTS USED IN THIS COMPONENT */
    components: {
      Card,
      ClipLoader
    },
    /* METHODS/FUNCTIONS OF THIS COMPONENT */
    methods: {
      /**
       * Validates the form, check for non empty values.
       */
      validateForm () {
        this.thereAreErrors = false
        /* Text fields, must contain text */
        for (let key of Object.keys(this.inputs.text)) {
          const input = this.inputs.text[key]
          if (!input.payload) this.thereAreErrors = input.error = true
          else input.error = false
        }
        /* Drop downs: At least one must be selected */
        for (let key of Object.keys(this.inputs.dropDowns)) {
          const dropDown = this.inputs.dropDowns[key]
          if (dropDown.options.find(option => option.selected) === undefined) this.thereAreErrors = dropDown.error = true
          else dropDown.error = false
        }
        /* Passwords: Must contain same text */
        const passwords = this.inputs.passwords
        if (!passwords.first.payload) this.thereAreErrors = passwords.first.error = true
        else passwords.first.error = false
        if (!passwords.confirmation.payload) this.thereAreErrors = passwords.confirmation.error = true
        else passwords.confirmation.error = false
        if (passwords.first.payload !== passwords.confirmation.payload) this.thereAreErrors = this.differencePasswordsError = true
        /* RETURN TRUE IF THERE ARE NO ERRORS */
        return !this.thereAreErrors
      },
      /**
       * Check that the data of the form is filled (not empty values) and call the register API.
       */
      async register () {
        if (this.validateForm()) {
          this.loading = true
          // TODO: Call api
        }
      },
      /**
       * Focus the first input element of the form.
       */
      focus () { this.$el.querySelector('input').focus() }
    },
    /* HOOKS OF THE COMPONENT */
    mounted: function () { this.focus() }
  }
</script>

<style scoped>
  label.error {
    color: #ff0000
  }

  .align-center {
    text-align: center;
  }
</style>
