<template>
  <card style="overflow: auto; height: 300px;">
    <!-- HEADERS -->
    <h3 slot="header" class="title" :style="{fontSize: titleSize}">{{ title }}</h3>
    <!-- BODY -->
    <h6 class="label-info margin-top h1" v-if="bidding.questions.length < 1"><b>No hay nada para mostrar</b></h6>
    <div class="list-group" v-for="(question, index) in bidding.questions" :key="index">
      <a class="list-group-item list-group-item-action flex-column align-items-start"  v-if="question.answer">
        <p class="mb-1" style="color: #2a92f0"><b>Pregunta N°{{(index+1)}}: </b>{{question.question}}</p>
        <p class="mb-1" style="color: #1799dc"><b>Respuesta: </b>{{question.answer}}</p>
      </a>
    </div>
  </card>
</template>

<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  export default {
    name: 'QuestionsAndAnswersListing',
    components: {
      Card
    },
    props: {
      bidding: {
        type: Object,
        required: true
      },
      /**
       * Title of the input card.
       */
      title: {
        type: String,
        default: 'Preguntas y Respuestas'
      },
      /**
       * Size in pixels of the title.
       */
      titleSize: {
        type: String,
        default: '30px'
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
</style>
