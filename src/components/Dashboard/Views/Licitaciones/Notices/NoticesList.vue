<template>
  <div class="content" style="overflow: auto; height: 250px;">
    <!-- HEADERS -->
    <h3 class="title">Avisos Publicados</h3>
    <!-- BODY -->
    <label class="label-info margin-top h4" v-if="bidding.notices.length < 1"><b>No existen avisos por el momento</b></label>
    <div class="list-group" v-for="(notice, index) in notices" :key="index">
      <a class="list-group-item list-group-item-action flex-column align-items-start">
        <p class="mb-1">{{notice.notice}}</p>
        <small>{{formatDate(notice.date)}}</small>
      </a>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'NoticesList',
      data () {
        return {
          notices: ''
        }
      },
      props: {
        /**
         * Bidding with all of its elements. This component in particular uses the notices element of the bidding.
         */
        bidding: {
          type: Object,
          required: true
        }
      },
      beforeMount: function () {
        this.notices = this.bidding.notices.slice().reverse()
      },
      methods: {
        formatDate: (date) => {
          const dateFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          }
          let stringDate = (new Date(date)).toLocaleDateString('es-ES', dateFormatOptions).replace(',', '')
          return stringDate.charAt(0).toUpperCase() + stringDate.slice(1)
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
