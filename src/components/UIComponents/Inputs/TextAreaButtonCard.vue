<template>
  <card class="text-area-card">
    <h4 slot="header" class="title" :style="{fontSize: titleSize}">{{ title }}</h4>
    <div class="form-group">
      <textarea class="form-text" title="text" v-model="text" placeholder="Ingrese texto..."></textarea>
    </div>
    <div class="stats col-xs-9" slot="footer">
      <clip-loader :loading="loading" color="#1DC7EA" class="clip-loader"/>
      <button v-if="!loading" class="btn btn-fill btn-round btn-info" @click="$emit('upload', text)">
        {{buttonLabel}}
      </button>
    </div>
  </card>
</template>

<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import ClipLoader from 'vue-spinner/src/ClipLoader'

  export default {
    data () {
      return {
        text: ''
      }
    },
    components: {
      Card,
      ClipLoader
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      /**
       * Title of the input card.
       */
      title: {
        type: String,
        default: 'Please provide a title'
      },
      /**
       * Size in pixels of the title.
       */
      titleSize: {
        type: String,
        default: '30px'
      },
      /**
       * Label of the button.
       */
      buttonLabel: {
        type: String,
        default: 'Publicar'
      }
    }
  }
</script>

<style scoped>

  .text-area-card {
    /* Border */
    --border-color: #e4e4e4;
    border: solid 1px var(--border-color);
    border-radius: 5px;
    width: auto;
    height: 100%;
  }

  .title {
    margin: 0 10px 10px;
    font-weight: 400;
    color: #616161;
  }

  .form-group {
    align-self: center;
    justify-content: space-evenly;
  }

  .form-text {
    width: 100%;
    height: 50%;
  }

</style>
