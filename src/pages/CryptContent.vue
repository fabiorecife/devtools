<template>
   <q-page padding>
     <h1>Crypto</h1>
     <q-btn class="q-mr-md" @click="encriptar" label="Encritpar" ></q-btn>

   </q-page>
</template>
<script>
export default {
  name: 'CryptContent',
  methods: {
    encriptar () {
      console.log('encriptar')
    }
  }
}
</script>
