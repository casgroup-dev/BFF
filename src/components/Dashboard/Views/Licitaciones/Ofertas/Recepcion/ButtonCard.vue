<template>
  <card @click="$emit('click')"
        class="button-card">
    <i v-if="icon" :class="`fa ${icon} icon`" :style="{color: iconColor}"></i>
    <h3 class="title">{{ text }}</h3>
  </card>
</template>

<script>
  import Card from '../CardV2'

  export default {
    components: {
      Card
    },
    props: {
      text: String,
      icon: {
        type: String,
        default: ''
      },
      iconColor: {
        type: String,
        default: '#FF9800'
      }
    }
  }
</script>

<style scoped src="../assets/title.css"></style>
<style scoped>
  .button-card {
    cursor: pointer;
    display: flex;
    flex-direction: row;
  }

  .button-card:hover {
    background: #f6f6f6;
  }

  .icon {
    --icon-size: 70px;
    font-size: var(--icon-size);
    height: var(--icon-size);
    width: var(--icon-size);
    flex-grow: 1;
  }

  .title {
    text-align: center;
    flex-grow: 2;
    margin: auto;
  }
</style>
