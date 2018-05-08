<template>
  <div class="row">
    <div class="col-6 offset-3 search-bar">
      <div class="col-1 nc-icon nc-zoom-split"></div>
      <input
        class="col-10"
        @input="$emit('input',$event.target.value)"
        v-bind:placeholder="placeholder"
        style="border: hidden"
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchBar',
    props: {
      placeholder: {type: String, default: 'Buscar...'}
    }
  }
</script>

<style scoped>
  .search-bar {
    padding: 10px 0 10px 0;
    border: 1px solid #858585;
    border-radius: 4px;
  }
</style>
