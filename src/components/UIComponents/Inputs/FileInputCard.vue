<template>
  <div class="file-input-card">
    <i v-if="icon" :class="`fa ${icon} icon`" :style="{color: iconColor}"></i>
    <div class="content">
      <h2 v-if="title" class="title" :style="{fontSize: titleSize}">{{ title }}</h2>
      <div class="custom-file">
        <input type="file" class="custom-file-input" :multiple="multiple"
               ref="input" @change="setFiles">
        <label class="custom-file-label">{{inputLabelComputed}}</label>
      </div>
      <clip-loader :loading="loading" color="#1DC7EA" class="clip-loader"/>
      <button v-if="!loading && files.length" class="btn btn-fill btn-round btn-upload"
              :style="{backgroundColor: buttonColor}"
              @click="uploadFiles">
        <i class="fa fa-upload"></i> Subir archivos
      </button>
    </div>
  </div>
</template>

<script>
  import ClipLoader from 'vue-spinner/src/ClipLoader'
  import api from '../../../apis/users'
  import axios from 'axios'

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
        files: [],
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
       * Icon to use in the input card. You must use the font awesome icons.
       * Ref: https://fontawesome.com/v4.7.0/icons/
       */
      icon: {
        type: String,
        default: 'fa-cloud-upload'
      },
      /**
       * Title of the input card.
       */
      title: {
        type: String,
        default: 'Please provide a title'
      },
      inputLabel: {
        type: String
      },
      /**
       * Boolean that indicates if the input can accept multiple files.
       */
      multiple: {
        type: Boolean,
        default: true
      },
      /**
       * Color of the button to upload the files.
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
      }
    },
    /**
     * Computed properties of the component.
     */
    computed: {
      /**
       * Label to show in the input label.
       */
      inputLabelComputed () {
        if (this.fileNames.length) return this.fileNames.join(', ')
        if (this.inputLabel) return this.inputLabel
        /* There is no file or prop with the label for the input. Put a default message */
        const baseMessage = 'Seleccionar archivo'
        if (!this.multiple) return baseMessage
        else return baseMessage + 's'
      },
      /**
       * Array with the names of the files.
       */
      fileNames () {
        if (this.files.length) return Array.prototype.map.call(this.files, file => file.name)
        else return []
      }
    },
    /**
     * Methods of the component.
     */
    methods: {
      /**
       * Set files array from the input.
       */
      setFiles () {
        this.files = this.$refs.input.files
      },
      /**
       * Upload the files to S3 and emit an event with every object uploaded.
       */
      uploadFiles () {
        this.loading = true
        /* Create promises that resolves with each signed request and url for each file */
        const promises = Array.prototype.map.call(
          this.files, // Files is not an array, is a FileList, so we need to call the map function like this
          file => api.getSignedUrlToPutObject(file.name, file.type)
        )
        /* Wait for all promises to resolve */
        Promise.all(promises).then(async results => {
          /* results is an array of object with 'signedRequest' and 'url' (where the file can be downloaded) */
          for (let i = 0; i < results.length; i++) {
            let file = this.files[i]
            let signedRequest = results[i].signedRequest
            let urlToDownloadTheFile = results[i].url
            try {
              await axios.put(signedRequest, file, {headers: {'Content-Type': file.type}})
              this.emitUploadedFileEvent(file.name, urlToDownloadTheFile)
            } catch (err) {
              console.error(err)
              this.notifyError(file.name)
            }
          }
          /* Back to normality */
          this.loading = false
          this.files = []
        })
      },
      /**
       * Emits an event when a new file is uploaded. It gives the url with the event to download the new file.
       */
      emitUploadedFileEvent (fileName, url) {
        this.notifySuccess(fileName)
        this.$emit('uploaded', url)
      },
      /**
       * Show a notification indicating that the file was uploaded successfully.
       * @param {String} fileName - Name of the file that was uploaded successfully.
       */
      notifySuccess (fileName) {
        this.$notify({
          ...this.baseNotification,
          component: {template: `<span>Fue subido con éxito el archivo <b>${fileName}</b></span>`},
          icon: 'fa fa-check',
          type: 'success'
        })
      },
      /**
       * Show a notification as a warning indicating the the given file does not uploaded correctly.
       * @param {String} fileName - Name of the file that was not uploaded.
       */
      notifyError (fileName) {
        this.$notify({
          ...this.baseNotification,
          component: {template: `<span>Ocurrió un problema subiendo el archivo <b>${fileName}</b><br>Inténtalo nuevamente.</span>`},
          icon: 'fa fa-exclamation',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped>
  .file-input-card {
    margin: 5px;
    padding: 10px;
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

  .btn-upload {
    padding: 5px 18px;
    margin-top: 10px;
    border: 0;
  }

  .clip-loader {
    margin-top: 10px;
  }

  .custom-file-label {
    overflow: auto;
  }
</style>
