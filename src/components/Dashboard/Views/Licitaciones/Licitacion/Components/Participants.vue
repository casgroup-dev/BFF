<template>
  <div class="participants-card">
    <i v-if="icon" :class="`fa ${icon} icon`" :style="{color: iconColor}"></i>
    <div class="content">
      <h2 v-if="title" class="title" :style="{fontSize: titleSize}">{{ title }}</h2>
      <div class=""
    </div>
  </div>
</template>

<script>
    export default {
        name: "Participants"
    }
</script>

<style scoped>

</style>
