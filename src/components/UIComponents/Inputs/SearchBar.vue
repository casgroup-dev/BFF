<template>
  <div class="row">
    <div class="col-6 search-bar">
      <div class="col-1 nc-icon nc-zoom-split"></div>
      <input
        class="col-10"
        :value="searchValue"
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
    searchValue: '',
    props: {
      placeholder: {type: String, default: 'Buscar...'}
    }
  }
</script>

<style scoped>
  .search-bar {
    margin: 5px 0px 15px 15px;
    padding: 10px 0px 10px 0px;
    border: 2px solid #000000;
    border-radius: 4px;
  }
</style>
