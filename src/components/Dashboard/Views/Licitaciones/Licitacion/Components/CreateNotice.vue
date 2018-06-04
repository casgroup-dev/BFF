<template>
  <card>
    <h2 slot="header" class="title" :style="{fontSize: titleSize}">Publicar aviso</h2>
    <div class="textarea">
      <textarea v-model="message" placeholder="Escriba el aviso aquí..."></textarea>
    </div>
    <div class="stats col-xs-9" slot="footer">
      <button class="btn btn-default" @click="cancelNotice">
        Cancelar
      </button>
      <button class="btn btn-success" @click="postNotice">
        Publicar aviso
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
        closeNotice: false,
        text: ''
      }
    },
    components: {
      Card,
      ClipLoader
    },
    props: {
      notice: {
        type: String,
        default: ''
      },
      titleSize: {
        type: String,
        default: '30px'
      }
    },
    methods: {
      // TODO: se clickeo el boton y se debe hacer POST del notice al endpoint
      postNotice: function () {
        this.closeNotice = true
      },
      cancelNotice: function () {
        this.closeNotice = false
      }
    }
  }
</script>

<style scoped>

  .title {
    margin: 0 10px 10px;
    font-weight: 400;
    color: #616161;
  }

  .textarea {
    width: 100%;
    align-self: center;
    justify-content: space-evenly;
  }

</style>
