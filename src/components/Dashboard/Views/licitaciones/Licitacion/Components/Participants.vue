<template>
  <stats-card>
    <div slot="header" class="icon-success">
      <i v-if="icon" :class="`fa ${icon} icon`" :style="{color: iconColor}"></i>
    </div>
    <div slot="content" class="numbers">
      <p>Participantes</p>{{ participants.length }}
    </div>
    <div slot="footer">
      <button v-if="participants.length" class="btn btn-fill btn-round"
              :style="{backgroundColor: buttonColor}">
        <i class="fa fa-users"></i> Ver Participantes
      </button>
    </div>
  </stats-card>
</template>

<script>
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'

  const defaultColor = '#02B2A9'

  export default {

    components: {
      StatsCard
    },

    data () {
      return {
        participants: [136689]
      }
    },

    props: {
      icon: {
        type: String,
        default: 'fa fa-users'
      },
      title: {
        type: String,
        default: 'Insert title here'
      },
      iconColor: {
        type: String,
        default: defaultColor
      },
      buttonColor: {
        type: String,
        default: defaultColor
      },
      titleSize: {
        type: String,
        default: '30px'
      }
    },

    computed: {

    },

    methods: {

    }
  }
</script>

<style scoped>

</style>
