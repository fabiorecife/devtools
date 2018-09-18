<template>
  <q-page padding>
    <q-input
      v-model="text"
      type="textarea"
      float-label="Textarea"
      :max-height="100"
      rows="7"
    />
  </q-page>
</template>

<script>
export default {
  name: 'HtmlEntityConvert',
  data () {
    return {
      htmlentity: '',
      text: ''
    }
  }
}
</script>

<style>
</style>
