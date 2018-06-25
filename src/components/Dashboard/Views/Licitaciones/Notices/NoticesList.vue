<template>
  <div class="content" style="overflow: auto; height: 250px;">
    <!-- HEADERS -->
    <h3 class="title">Avisos Publicados</h3>
    <!-- BODY -->
    <label class="label-info margin-top h4" v-if="bidding.notices.length < 1"><b>No existen avisos por el momento</b></label>
    <div class="list-group" v-for="(notice, index) in reverseItems" :key="index">
      <a class="list-group-item list-group-item-action flex-column align-items-start">
        <p class="mb-1">{{notice.notice}}</p>
        <small>{{notice.date}}</small>
      </a>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'NoticesList',
      props: {
        bidding: {
          type: Object,
          required: true
        }
      },
      computed: {
        reverseItems () {
          return this.bidding.notices.slice().reverse()
        }
      }
    }
</script>

<style scoped>
  .title {
    margin: 0 15px 10px;
    font-weight: 400;
    color: #616161;
  }
  .content {
    margin: 5px;
    padding: 10px;
    background-color: #FFFFFF;
    /* Display */
    justify-content: space-evenly;
    /* Border */
    --border-color: #e4e4e4;
    border: solid 1px var(--border-color);
    border-radius: 5px;
  }
</style>
