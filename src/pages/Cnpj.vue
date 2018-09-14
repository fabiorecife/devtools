
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
    },
    gerarCnpj () {
      this.cnpjs.push(cnpj.format(cnpj.generate()))
    }
  }
}
</script>

<style>
</style>
