<template>
  <h1 class="title">{{title}}</h1>
</template>

<script>
  export default {
    props: {
      title: {type: String}
    }
  }
</script>

<style>
  .title {
    font-weight: 400;
    color: #616161;
  }
</style>
