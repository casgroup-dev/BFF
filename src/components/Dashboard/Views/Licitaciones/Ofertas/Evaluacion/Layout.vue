<template>
  <div class="container-fluid">
    <!-- TECHNICAL OFFERS -->
    <list-files-per-provider-card :files="technicalFiles" title="Ofertas técnicas"/>
  </div>
</template>

<script>
  import ListFilesPerProviderCard from './ListFilesPerProviderCard'

  export default {
    components: {
      ListFilesPerProviderCard
    },
    created () {
      // TODO: Api call
      this.files = {
        'Microsoft': {
          economicals: [
            {name: 'archivo', url: 'https://www.google.com'},
            {name: 'archivo', url: 'https://www.google.com'},
            {name: 'archivo', url: 'https://www.google.com'}
          ],
          technicals: [
            {name: 'archivo', url: 'https://www.google.com'},
            {name: 'archivo', url: 'https://www.google.com'},
            {name: 'archivo', url: 'https://www.google.com'}
          ]
        }
      }
    },
    computed: {
      technicalFiles () {
        let result = {}
        Object.keys(this.files).forEach(provider => {
          result[provider] = this.files[provider].technicals
        })
        return result
      }
    }
  }
</script>

<style scoped>

</style>
