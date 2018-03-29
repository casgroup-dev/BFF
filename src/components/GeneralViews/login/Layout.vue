<template>
  <full-page-container>
    <div class="row h-100">
      <div class="col-md-4 offset-md-4 col-sm-12 align-self-center">
        <Form/>
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

<style scoped></style>
