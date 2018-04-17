<template>
  <full-page-container>
    <div class="row" style="padding: 20px 0; min-height: 100vh;">
      <div class="col-md-4 offset-md-4 col-sm-12 align-self-center">
        <transition name="fade" mode="out-in" appear>
          <!-- FORM ONLY IF IT IS AUTHORIZED -->
          <Form v-if="authorized"></Form>
          <!-- EMAIL VERIFICATION FIRST -->
          <card v-else>
            <h2 class="align-center">Registro</h2>
            <!-- EMAIL -->
            <div class="row">
              <div class="col-12">
                <fg-input v-model="email" @enter="isShadowUser" placeholder="email@email.com">
                  <label slot="label" class="control-label">Por favor indíquenos su email.</label>
                </fg-input>
              </div>
            </div>
            <!-- BUTTON CONFIRMATION AND ERRORS -->
            <div class="row">
              <div class="col-12 align-center">
                <!-- ERRORS -->
                <div class="row">
                  <div class="col-12">
                    <label v-if="error" class="control-label error">{{ error }}</label>
                  </div>
                </div>
                <!-- BUTTON ANS SPINNER -->
                <div class="row">
                  <div class="col-12">
                    <button v-if="!loading" class="btn btn-info btn-fill" @click="isShadowUser">
                      Proceder al registro
                    </button>
                    <clip-loader :loading="loading" color="#1DC7EA"/>
                  </div>
                </div>
              </div>
            </div>
          </card>
        </transition>
      </div>
    </div>
  </full-page-container>
</template>

<script>
  import Form from './Form'
  import FullPageContainer from '../../UIComponents/FullPageContainer'
  import usersApi from '../../../apis/users'
  import Card from '../../UIComponents/Cards/Card'
  import ClipLoader from 'vue-spinner/src/ClipLoader'

  export default {
    data () {
      return {
        authorized: false,
        email: null,
        loading: false,
        error: null
      }
    },
    components: {
      Form,
      FullPageContainer,
      Card,
      ClipLoader
    },
    methods: {
      isShadowUser () {
        if (!this.email) this.error = 'Ingrese su email por favor.'
        else {
          this.error = null
          this.loading = true
          const self = this
          usersApi.isShadowUser(this.email)
            .then(() => { self.authorized = true })
            .catch(err => { self.error = err.message })
            .then(() => { self.loading = false })
            .then(() => { self.authorized = true })
        }
      }
    },
    mounted () {
      this.$el.querySelector('input').focus()
    }
  }
</script>

<style scoped src="../../../assets/css/animations/fade.css"></style>
<style scoped>
  .align-center {
    text-align: center;
  }

  label.error {
    color: #ff0000;
    padding: 5px;
  }
</style>
