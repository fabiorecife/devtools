<template>
  <q-page padding>
    <p>PBKDF2</p>
    <router-link to="/crypto-pbkdf2">PBKDF2</router-link>
    <p class="q-mt-lg">HASH</p>
    <router-link to="/crypto-hash">HASH</router-link>
    <p class="q-mt-lg">Encrypt\Decrypt</p>
    <router-link to="/crypto-file">Crypto Content</router-link>
  </q-page>
</template>

<script>
import forge from 'forge-dist'

export default {
  name: 'Crypto101',
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
