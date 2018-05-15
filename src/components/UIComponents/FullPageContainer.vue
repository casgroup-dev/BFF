<template>
  <div class="container" :style="style">
    <slot/>
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
      style () {
        return {
          backgroundImage: `url(${this.backgroundImage})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '100vh',
          minWidth: '100%'
        }
      }
    }
  }
</script>

<style scoped>

</style>
