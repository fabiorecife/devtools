<template>
  <q-page padding>
    <p>PFX FILE</p>

    <div class="row q-mt-lg">
      <div class="col-12">
        <q-field class="justify-end"
                 icon="credit_card"
                 label="Selecione um arquivo:"></q-field>
        <input class="q-mt-md q-mb-md" type="file" @change="processFilePfx($event)">
      </div>
    </div>
    <div class="row qt-mt-lg">
      <div class="col-xs-12">
        <q-btn class="q-mr-md" @click="processar" label="Processar" ></q-btn>
      </div>
    </div>

    <p class="q-mt-md">Resultado:</p>

    <p class="q-mt-md">Para saber mais:</p>
    <ul>
      <li><a href="https://en.wikipedia.org/wiki/SHA-2">wikipedia</a></li>
      <li><a href="https://github.com/digitalbazaar/forge#message-digests-1">FORGE JS</a></li>
    </ul>
  </q-page>
</template>

<script>
import forge from 'forge-dist'

export default {
  name: 'CryptoSha256',
  data () {
    return {
      fileContent: '',
      fileLoaded: false
    }
  },
  computed: {
    senhaError () {
      return false
    }
  },
  methods: {
    processar () {
      window.forge = forge
    },
    processFilePfx (event) {
      let fileAbertura = event.target.files[0]
      var fr = new FileReader()
      let vm = this
      fr.onload = function (e) {
        vm.fileContent = e.target.result
        vm.fileLoaded = true
      }
      fr.readAsArrayBuffer(fileAbertura)
    }
  }
}
</script>

<style>
</style>
