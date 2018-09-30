<template>
  <q-page padding>
    <p>PBKDF2</p>
    <div class="row">
      <div class="col-6">
        <q-field class="justify-end"
                 icon="credit_card"
                 label="Password"
        >
          <q-input
            type="text"
            v-model="pbkdf2.password"
          />
        </q-field>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <q-field class="justify-end"
                 icon="credit_card"
                 label="Salt"
        >
          <q-input
            type="text"
            v-model="pbkdf2.salt"
          />
        </q-field>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <q-field class="justify-end"
                 icon="credit_card"
                 label="Iterations"
        >
          <q-input
            type="text"
            v-model="pbkdf2.iterations"
          />
        </q-field>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <q-field class="justify-end"
                 icon="credit_card"
                 label="Key Size"
        >
          <q-input
            type="text"
            v-model="pbkdf2.keysize"
          />
        </q-field>
      </div>
    </div>
    <q-btn class="q-mr-md" @click="teste" label="Gerar PBKDF2" ></q-btn>

    <p class="q-mt-md">Resultado:</p>
    <ul>
      <li>base64: {{saidaPbkdf2.base64}}</li>
      <li>hex: {{saidaPbkdf2.hex}}</li>
      <li>string: {{saidaPbkdf2.texto}}</li>
    </ul>

    <p class="q-mt-md">Para saber mais:</p>
    <ul>
      <li><a href="https://en.wikipedia.org/wiki/PBKDF2">wikipedia</a></li>
      <li><a href="https://github.com/digitalbazaar/forge#pkcs5">FORGE JS</a></li>
    </ul>
  </q-page>
</template>

<script>
import forge from 'forge-dist'

export default {
  name: 'CryptoPbkdf2',
  data () {
    return {
      pbkdf2: {
        password: '',
        salt: '',
        iterations: 4096,
        keysize: 16
      },
      saidaPbkdf2: {
        base64: '',
        hex: '',
        texto: ''
      }
    }
  },
  computed: {
    senhaError () {
      return false
    }
  },
  methods: {
    teste () {
      window.forge = forge
      console.log(forge)
      console.log(this.senha)
      let derivedKey = forge.pkcs5.pbkdf2(this.pbkdf2.password, this.pbkdf2.salt, this.pbkdf2.iterations, this.pbkdf2.keysize)
      this.saidaPbkdf2.base64 = forge.util.encode64(derivedKey)
      this.saidaPbkdf2.hex = forge.util.bytesToHex(derivedKey)
      this.saidaPbkdf2.texto = derivedKey
    }
  }
}
</script>

<style>
</style>
