<template>
  <q-page padding>
    <!-- content -->
    <p>Validação</p>
    <div class="row">
      <div class="col-6">
        <q-field class="justify-end"
          icon="credit_card"
          label="CPF"
          :helper="cpfHelper"
          error-label="CPF inválido"
          :error="cpfError"
        >
          <q-input
            type="text"
            v-model="cpfInput"
          />
        </q-field>
      </div>
    </div>
    <p class="q-pt-md">Geração</p>
    <div class="row">
      <div class="col-6">
        <q-field class="justify-end"
          icon="credit_card"
          label="Size"
          :helper="'vezes'"
          error-label="CPF inválido"
          :error="cpfError"
        >
          <q-input
            type="text"
            v-model="size"
          />
        </q-field>
      </div>
    </div>
    <div class="row q-pt-md">
      <q-btn class="q-mr-sm " label="Gerar" @click="gerarCpf"/>
      <q-btn label="Limpar" @click="limparCpf"/>
      <a :class="{'q-ml-md': true, 'hidden':!showFileDownload, 'text-center': true}" :href="fileDownload"
         download="cnpjs.txt"><q-btn icon="file_copy" label="Download" /></a>
    </div>
    <div class="row q-pt-md" v-if="cpfs.length > 0">
      <q-list>
        <q-item v-for="_cpf in cpfs" :key="_cpf">{{_cpf}}</q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import cpf from '@fabioalmeida/cpf'

export default {
  name: 'CpfPage',
  data () {
    return {
      size: 1,
      cpfInput: '',
      showFileDownload: false,
      fileDownload: '', // 'data:text/plain;charset=utf-8,'
      cpfs: []
    }
  },
  computed: {
    cpfHelper () {
      let cpfnum = cpf.removePunctuation(this.cpfInput)
      if (cpfnum.length === 11 && cpf.isValid(this.cpfInput)) {
        return 'CPF Válido'
      } else {
        return 'Entre o CPF que deseja validar'
      }
    },
    cpfError () {
      let cpfnum = cpf.removePunctuation(this.cpfInput)
      if (cpfnum.length >= 11) {
        return !cpf.isValid(this.cpfInput)
      } else {
        return false
      }
    }
  },
  methods: {
    limparCpf () {
      this.cpfs = []
    },
    gerarCpf () {
      let content, i
      for (i = 0; i < this.size; i++) {
        this.cpfs.push(cpf.format(cpf.generate()))
      }
      for (i = 0, content = ''; i < this.cpfs.length; i++) {
        content += this.cpfs[i] + '\n'
      }

      this.showFileDownload = true
      this.fileDownload = 'data:text/plain;charset=utf-8,' + content
    }
  }
}
</script>

<style>
</style>
