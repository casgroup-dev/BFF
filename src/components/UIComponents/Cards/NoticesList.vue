<template>
  <div class="content" style="overflow: auto; height:200px; width:200px;">
    <h2>List Group With Custom Content</h2>
    <div class="list-group">
      <a href="#" class="list-group-item">
        <h4 class="list-group-item-heading">Third List Group Item Heading</h4>
        <p class="list-group-item-text">List Group Item Text</p>
      </a>
      <a href="#" class="list-group-item">
        <h4 class="list-group-item-heading">Third List Group Item Heading</h4>
        <p class="list-group-item-text">List Group Item Text</p>
      </a>
      <a href="#" class="list-group-item">
        <h4 class="list-group-item-heading">Third List Group Item Heading</h4>
        <p class="list-group-item-text">List Group Item Text</p>
      </a>
      <a href="#" class="list-group-item">
        <h4 class="list-group-item-heading">Third List Group Item Heading</h4>
        <p class="list-group-item-text">List Group Item Text</p>
      </a>
      <a href="#" class="list-group-item">
        <h4 class="list-group-item-heading">Third List Group Item Heading</h4>
        <p class="list-group-item-text">List Group Item Text</p>
      </a>
      <a href="#" class="list-group-item">
        <h4 class="list-group-item-heading">Third List Group Item Heading</h4>
        <p class="list-group-item-text">List Group Item Text</p>
      </a>
      <a href="#" class="list-group-item">
        <h4 class="list-group-item-heading">Third List Group Item Heading</h4>
        <p class="list-group-item-text">List Group Item Text</p>
      </a>
      <a href="#" class="list-group-item">
        <h4 class="list-group-item-heading">Third List Group Item Heading</h4>
        <p class="list-group-item-text">List Group Item Text</p>
      </a>
      <a href="#" class="list-group-item">
        <h4 class="list-group-item-heading">Third List Group Item Heading</h4>
        <p class="list-group-item-text">List Group Item Text</p>
      </a>
      <a href="#" class="list-group-item">
        <h4 class="list-group-item-heading">Third List Group Item Heading</h4>
        <p class="list-group-item-text">List Group Item Text</p>
      </a>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'NoticesList'
    }
</script>

<style scoped>
  .content {
    margin: 5px;
    padding: 10px;
    background-color: #FFFFFF;
    /* Display */
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    /* Border */
    --border-color: #e4e4e4;
    border: solid 1px var(--border-color);
    border-radius: 5px;
  }
</style>
