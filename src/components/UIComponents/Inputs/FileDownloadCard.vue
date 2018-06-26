<template>
  <div class="file-download-card">
    <i v-if="icon" :class="`fa ${icon} icon`" :style="{color: iconColor}"></i>
    <div class="content">
      <h2 v-if="title" class="title" :style="{fontSize: titleSize}">{{ title }}</h2>
      <clip-loader :loading="loading" color="#1DC7EA" class="clip-loader"/>
      <button v-if="!loading" class="btn btn-fill btn-round btn-download"
              :style="{backgroundColor: buttonColor}"
              @click="downloadFiles">
        <i class="fa fa-download"></i> Descargar archivos
      </button>
    </div>
  </div>
</template>

<script>
  import ClipLoader from 'vue-spinner/src/ClipLoader'

  const defaultColor = '#03A9F4'

  export default {
    /**
     * Components to use in this component.
     */
    components: {
      ClipLoader
    },
    /**
     * Data managed by the component.
     * It is a method because it must need to return a new object for each instance of this component.
     */
    data () {
      return {
        loading: false,
        baseNotification: {
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          timeout: 20000
        }
      }
    },
    /**
     * Properties of the component.
     */
    props: {
      /**
       * Icon to use in the download card. You must use the font awesome icons.
       * Ref: https://fontawesome.com/v4.7.0/icons/
       */
      icon: {
        type: String,
        default: 'fa-cloud-download'
      },
      /**
       * Title.
       */
      title: {
        type: String,
        default: 'Please provide a title'
      },
      /**
       * Color of the button to download the files.
       * Recommended colors: https://vuetifyjs.com/en/style/colors
       */
      buttonColor: {
        type: String,
        default: defaultColor
      },
      /**
       * Color of the icon.
       * Recommended colors: https://vuetifyjs.com/en/style/colors
       */
      iconColor: {
        type: String,
        default: defaultColor
      },
      /**
       * Size in pixels of the title.
       */
      titleSize: {
        type: String,
        default: '30px'
      },
      /**
       * Downloadable files
       */
      files: Array
    },
    /**
     * Methods of the component.
     */
    methods: {
      /**
       * Download the files
       */
      downloadFiles () {
        this.loading = true
        for (let i = 0; i < this.files.length; i++) {
          let file = this.files[i]
          try {
            window.open(file.url)
          } catch (err) {
            console.error(err)
            this.notifyError(file.name)
          }
        }
        this.loading = false
      },
      /**
       * Show a notification as a warning indicating the the given file does not downloaded correctly.
       * @param {String} fileName - Name of the file that was not uploaded.
       */
      notifyError (fileName) {
        this.$notify({
          ...this.baseNotification,
          component: {template: `<span>Ocurrió un problema descargando el archivo <b>${fileName}</b><br>Inténtalo nuevamente.</span>`},
          icon: 'fa fa-exclamation',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped>
  .file-download-card {
    margin: 5px;
    padding: 10px;
    background-color: #FFFFFF;
    /* Display */
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    /* Border */
    --border-color: #e4e4e4;
    border: solid 1px var(--border-color);
    border-radius: 5px;
  }

  .icon {
    /* Size */
    --icon-size: 75px;
    width: var(--icon-size);
    height: var(--icon-size);
    font-size: var(--icon-size);
    /* Flex */
    flex-grow: 2;
    align-self: center;
  }

  .content {
    flex-grow: 2;
    text-align: center;
  }

  .title {
    margin: 0 15px 10px;
    font-weight: 400;
    color: #616161;
  }

  input {
    cursor: pointer;
  }

  .btn-download {
    padding: 5px 18px;
    margin-top: 10px;
    border: 0;
  }

  .clip-loader {
    margin-top: 10px;
  }
</style>
