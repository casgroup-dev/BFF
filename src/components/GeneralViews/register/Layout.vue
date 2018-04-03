<template>
  <full-page-container>
    <div class="row h-100">
      <div class="col-md-6 offset-md-3 col-sm-12 align-self-center">
        <transition name="fade" mode="out-in" appear>
          <Form></Form>
        </transition>
      </div>
    </div>
  </full-page-container>
</template>

<script>
  import Form from './Form'
  import FullPageContainer from '../../UIComponents/FullPageContainer'

  export default {
    components: {
      Form,
      FullPageContainer
    }
  }
</script>

<style scoped src="../../../assets/css/animations/fade.css"></style>
