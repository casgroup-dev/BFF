<template>
  <div class="wrapper wrapper-full-page" :style="wrapperStyle">
    <div class="container h-100 w-100">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'full-page-container',
    props: {
      backgroundImage: {
        type: String,
        default: 'static/img/backgrounds/login.jpg'
      }
    },
    computed: {
      wrapperStyle () {
        return {
          backgroundImage: `url(${this.backgroundImage})`,
          backgroundPosition: 'center'
        }
      }
    }
  }
</script>

<style scoped>

</style>
