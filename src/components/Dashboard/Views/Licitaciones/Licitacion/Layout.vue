<template>
  <ul class="flex-container">
    <ul class="flex-row">
      <Title class="flex-row-item" :title="bidding.name"></Title>
      <div class="flex-row-item">Stage</div>
      <div class="flex-row-item">Time Remaining</div>
    </ul>
    <ul class="flex-row">
      <div class="flex-row-item">Timeline</div>
    </ul>
    <ul class="flex-row">
      <div class="flex-row-item">Bases</div>
    </ul>
    <ul class="flex-row">
      <div class="flex-row-item">Oferta Tecnica</div>
      <div class="flex-row-item">Oferta Economica</div>
    </ul>
    <ul class="flex-row">
      <div class="flex-row-item">Resultado</div>
    </ul>
  </ul>
</template>

<script>
  import Title from './Components/Title'
  import Participants from './Components/Participants'
  import usersApi from 'src/apis/users'
  export default {
    name: 'Layout',
    components: {
      Title
    },
    data () {
      return {
        bidding: {
          name: {type: String},
          bidderCompany: {type: String},
          users: [{
            id: {type: String},
            role: {type: String},
            password: {type: String}
          }],
          bases: [{type: String}],
          periods: [{
            start: {type: String},
            end: {type: String}
          }]
        }
      }
    },
    created: function () {
      const self = this
      usersApi.getCurrentBidding().then(data => {
        self.bidding = data
      }).catch(err => {
        console.error(err)
        /* The user is not authorized to access here */
        self.$router.push('/')
      })
    }
  }
</script>

<style scoped>
  .flex-row{
    display: flex;
    flex-direction: row;
    /*background: blue;*/
    width: 100%;
    height: 10%;
    padding: 0;
    justify-content: space-around;
  }

  .flex-row-item {
    flex-grow: 1;
    /*background: tomato;*/
    padding: 5px;
    margin-top: 10px;

    line-height: 150px;
    /*color: white;*/
    font-weight: bold;
    font-size: 3em;
    text-align: center;
  }

  .flex-container {
    padding: 0;
    margin: 0;
    list-style: none;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-flex-flow: row wrap;
    justify-content: space-around;
  }

</style>
