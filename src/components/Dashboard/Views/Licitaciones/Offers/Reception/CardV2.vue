<template>
  <div class="card-v2">
    <slot/>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
  .card-v2 {
    margin: 5px;
    padding: 10px;
    background-color: #FFFFFF;
    --border-color: #e4e4e4;
    border: solid 1px var(--border-color);
    border-radius: 5px;
  }
</style>
