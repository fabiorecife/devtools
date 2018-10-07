
  <template>
    <q-page padding>
      <!-- content -->
      <p>Validação</p>
      <div class="row">
        <div class="col-6">
          <q-field class="justify-end"
                   icon="credit_card"
                   label="CNPJ"
                   :helper="cnpjHelper"
                   error-label="CNPJ inválido"
                   :error="cnpjError"
          >
            <q-input
              type="text"
              v-model="cnpjInput"
            />
          </q-field>
        </div>
      </div>
      <p class="q-pt-md">Geração</p>
      <div class="row q-pt-md">
        <q-btn class="q-mr-sm " label="Gerar" @click="gerarCnpj"/>
        <q-btn label="Limpar" @click="limparCnpj"/>
        <a :class="{'q-ml-md': true, 'hidden':!showFileDownload, 'text-center': true}" :href="fileDownload"
          download="cnpjs.txt"><q-btn icon="file_copy" label="Download" /></a>
      </div>
      <div class="row q-pt-md" v-if="cnpjs.length > 0">
        <q-list>
          <q-item v-for="_cnpj in cnpjs" :key="_cnpj">{{_cnpj}}</q-item>
        </q-list>
      </div>
    </q-page>
  </template>

<script>
import cnpj from '@fabioalmeida/cnpj'

export default {
  name: 'CnpjPage',
  data () {
    return {
      cnpjInput: '',
      showFileDownload: false,
      fileDownload: '', // 'data:text/plain;charset=utf-8,'
      cnpjs: []
    }
  },
  computed: {
    cnpjHelper () {
      let cnpjnum = cnpj.removePunctuation(this.cnpjInput)
      if (cnpjnum.length === 14 && cnpj.isValid(this.cnpjInput)) {
        return 'CPF Válido'
      } else {
        return 'Entre o CNPJ que deseja validar'
      }
    },
    cnpjError () {
      let cnpjnum = cnpj.removePunctuation(this.cnpjInput)
      if (cnpjnum.length >= 14) {
        return !cnpj.isValid(this.cnpjInput)
      } else {
        return false
      }
    }
  },
  methods: {
    limparCnpj () {
      this.cnpjs = []
      this.showFileDownload = false
    },
    gerarCnpj () {
      let content, i

      this.cnpjs.push(cnpj.format(cnpj.generate()))
      for (i = 0, content = ''; i < this.cnpjs.length; i++) {
        content += this.cnpjs[i] + '\n'
      }

      this.showFileDownload = true
      this.fileDownload = 'data:text/plain;charset=utf-8,' + content
    }
  }
}
</script>

<style>
</style>
