<template>
  <q-page padding>
    <q-card class="q-mb-md">
      <q-card-title>
        Oções
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <q-checkbox class="q-mr-md" v-model="options.allowUnsafeSymbols" color="secondary" label="Permitir símbolo inseguro" />
        <q-checkbox v-model="options.useNamedReferences" color="secondary" label="Usar referência de nomes" />
      </q-card-main>
    </q-card>

    <q-input
      class="q-mb-md"
      v-model="text"
      type="textarea"
      float-label="Entre aqui seu Texto"
      :max-height="100"
      rows="5"
      clearable
      clear-value=""
      inverted
    />

    <q-btn class="q-mr-md" @click="encode" label="Encode" ></q-btn>
    <q-btn @click="decode" label="Decode"></q-btn>

    <q-input
      class="q-mt-md"
      v-model="htmlentity"
      type="textarea"
      float-label="Html Entity"
      :max-height="100"
      rows="5"
      clearable
      clear-value=""
      inverted-light
    />
  </q-page>
</template>

<script>
import he from 'he'
export default {
  name: 'HtmlEntityConvert',
  data () {
    return {
      htmlentity: '',
      options: {
        allowUnsafeSymbols: true,
        useNamedReferences: true
      },
      text: 'fácio<i>teste</i>'
    }
  },
  methods: {
    encode () {
      console.log('encode')
      this.htmlentity = he.encode(this.text, this.options)
    },
    decode () {
      console.log('decode')
      this.text = he.decode(this.htmlentity)
    }
  }
}
</script>

<style>
</style>
