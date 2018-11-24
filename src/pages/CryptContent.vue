<template>
   <q-page padding>
     <h1>Crypto</h1>
     <div class="row q-mt-lg">
       <div class="col-12">
         <q-field class="justify-end"
                  icon="credit_card"
                  label="Selecione um arquivo:"></q-field>
         <input class="q-mt-md q-mb-md" type="file" @change="processFileAbertura($event)">
       </div>
     </div>
     <q-btn class="q-mr-md" @click="encriptar" label="Encritpar" ></q-btn>
     <a :class="{'q-ml-md': true, 'hidden':!showFileDownload, 'text-center': true}" :href="fileDownload"
        download="cnpjs.txt"><q-btn icon="file_copy" label="Download" /></a>
     <q-btn class="q-mr-md" @click="teste" label="teste" ></q-btn>
   </q-page>
</template>
<script>
import forge from 'forge-dist'

export default {
  name: 'CryptContent',
  data () {
    return {
      fileContent: '',
      fileLoaded: false,
      showFileDownload: false,
      fileDownload: '' // 'data:text/plain;charset=utf-8,'
    }
  },
  methods: {
    teste () {
      window.forge = forge
      console.log('teste')
    },
    encriptar () {
      console.log('encriptar')
      let content
      // generate a random key and IV
      // Note: a key size of 16 bytes will use AES-128, 24 => AES-192, 32 => AES-256
      let key = forge.random.getBytesSync(16)
      let iv = forge.random.getBytesSync(16)

      /* alternatively, generate a password-based 16-byte key
      let salt = forge.random.getBytesSync(128);
      let key = forge.pkcs5.pbkdf2('password', salt, numIterations, 16);
      */

      // encrypt some bytes using CBC mode
      // (other modes include: ECB, CFB, OFB, CTR, and GCM)
      // Note: CBC and ECB modes use PKCS#7 padding as default
      let cipher = forge.cipher.createCipher('AES-CBC', key)
      cipher.start({iv: iv})
      cipher.update(forge.util.createBuffer(this.fileContent))
      cipher.finish()
      content = cipher.output
      // outputs encrypted hex
      console.log(content.toHex())

      this.showFileDownload = true
      this.fileDownload = 'data:text/plain;charset=utf-8,' + content.getBytes()
    },
    processFileAbertura (event) {
      console.log(event)

      let fileAbertura = event.target.files[0]
      let fr = new FileReader()
      let vm = this
      fr.onload = function (e) {
        vm.fileContent = e.target.result
        vm.fileLoaded = true
      }
      fr.readAsBinaryString(fileAbertura)
    }
  }
}
</script>
