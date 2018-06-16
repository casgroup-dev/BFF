<template>
  <div class="content" style="overflow: auto; height:300px; width:200px;">
    <!-- HEADERS -->
    <h3 class="title">Preguntas Realizadas por los Proveedores</h3>
    <!-- BODY -->
    <div class="list-group" v-for="(question, index) in questions" :key="index">
      <a class="list-group-item list-group-item-action flex-column align-items-start">
        <p class="mb-1">{{question.question}}</p>
        <textarea class="form-text" title="text" v-model="text" placeholder="Ingrese respuesta..."></textarea>
        <button class="btn btn-fill btn-finish">
          Publicar Respuesta
        </button>
      </a>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'QuestionsToAnswersList',
      data () {
        return {
          text: ''
        }
      },
      props: {
        questions: {
          type: Array,
          required: true
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
    flex-wrap: wrap;
    /* Border */
    --border-color: #e4e4e4;
    border: solid 1px var(--border-color);
    border-radius: 5px;
  }

  textarea {
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  button {
    margin: 10px;
    margin-left: auto;
    margin-right: auto;
  }

  .form-text {
    width: 70%;
    height: 50%;
  }
</style>
