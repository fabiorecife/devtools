<template>
  <q-page padding>
    <p>SHA2-256</p>
    <div class="row">
      <div class="col-12">
        <q-field class="justify-end"
                 icon="credit_card"
                 label="Conteúdo"
        >
          <q-input
            type="text"
            v-model="texto"
          />
        </q-field>
      </div>
    </div>
    <div class="row q-mt-lg">
      <div class="col-12">
        <q-field class="justify-end"
                 icon="credit_card"
                 label="Selecione um arquivo:"></q-field>
        <input class="q-mt-md q-mb-md" type="file" @change="processFileAbertura($event)">
      </div>
    </div>
    <div class="row qt-mt-lg">
      <div class="col-xs-12">
        <p class="caption">Algoritmo:</p>
        <q-radio v-model="algorithm" val="sha256" color="secondary" label="SHA-256" />
        <q-radio v-model="algorithm" val="md5" color="amber" label="MD5" style="margin-left: 10px" />
        <q-radio v-model="algorithm" val="sha1" color="red" label="SHA-1" style="margin-left: 10px" />
      </div>
    </div>
    <div class="row qt-mt-lg">
      <div class="col-xs-12">
        <q-btn class="q-mr-md" @click="processar" label="Processar" ></q-btn>
      </div>
    </div>

    <p class="q-mt-md">Resultado:</p>
    <ul>
      <li>base64: {{base64}}</li>
      <li>hex: {{hex}}</li>
    </ul>

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
      base64: '',
      hex: '',
      texto: '',
      content: '',
      algorithm: 'sha256'
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
      console.log(forge)
      let md = forge.md[this.algorithm].create()
      if (this.content === '') {
        this.content = this.texto
      }
      md.update(this.content)
      let digest = md.digest()
      this.base64 = forge.util.encode64(digest.data)
      this.hex = digest.toHex()
    },
    processFileAbertura (event) {
      let fileAbertura = event.target.files[0]
      var fr = new FileReader()
      let vm = this
      fr.onload = function (e) {
        vm.content = e.target.result
      }
      fr.readAsBinaryString(fileAbertura)
      console.log('processFile file ', fileAbertura)
    }
  }
}
</script>

<style>
</style>
