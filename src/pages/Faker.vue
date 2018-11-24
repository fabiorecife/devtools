<template>
  <q-page padding>
    <h3>FAKER NAME</h3>
    <p>Existe momentos que você precisa de uma lista de nomes para inserir no banco, ou no html, exemplo</p>
    <code>
      insert into usuario (id, nome, outros) values (&lt;%= inscricao %&gt;, &lt;%= name %&gt; '{"cpf":"&lt;%= cpf.numero %&gt;"}');
    </code>
    <div class="row q-mt-lg">
      <div class="col-12">
          <q-input
            v-model="textTemplate"
            type="textarea"
            float-label="Template"
            :max-height="100"
            rows="7"
          />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <q-field class="justify-end"
                 icon="credit_card"
                 label="Quantidade"
        >
          <q-input
            type="text"
            v-model="buildLength"
          />
        </q-field>
      </div>
    </div>
    <div class="q-mt-lg">
      <q-btn class="q-mr-md" @click="gerar" label="Gerar Nomes" ></q-btn>
      <q-btn class="q-mr-md" @click="limpar" label="Limpar" ></q-btn>
      <q-toggle v-model="showItem" label="Exibir lista" />
      <a :class="{'q-ml-md': true, 'hidden':!showFileDownload, 'text-center': true}"  :href="fileDownload"
         download="fake.txt"><q-btn icon="file_copy" label="Download" /></a>
      <div class="row q-pt-md" v-if="person.length > 0">
        <q-list v-if="showItem">
          <q-item v-for="_person in person" :key="_person">{{_person}}</q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import {female, male, lastname} from '../names.json'
import ejs from 'ejs'
import cpf from '@fabioalmeida/cpf'

export default {
  name: 'Faker',
  data () {
    return {
      person: [],
      showFileDownload: false,
      fileDownload: '', // 'data:text/plain;charset=utf-8,',
      buildLength: 3,
      textTemplate: '',
      showItem: true
    }
  },
  computed: {
    senhaError () {
      return false
    }
  },
  methods: {
    limpar () {
      this.person = []
      this.showFileDownload = false
      this.fileDownload = 'data:text/plain;charset=utf-8'
    },
    getRandomInt (max) {
      return Math.floor(Math.random() * Math.floor(max))
    },
    gerar () {
      let content = ''
      for (let i = 0; i < this.buildLength; i++) {
        let femaleIndex = this.getRandomInt(female.length)
        let maleIndex = this.getRandomInt(male.length)
        let lastnameIndex = this.getRandomInt(lastname.length)
        let name = lastname[lastnameIndex]

        if (Math.random() > 0.5) {
          name = male[maleIndex].toUpperCase() + ' ' + name
        } else {
          name = female[femaleIndex].toUpperCase() + ' ' + name
        }
        let text, id, _cpf, cpfNum
        id = i + 1
        cpfNum = cpf.generate()
        _cpf = {numero: cpfNum, formatado: cpf.format(cpfNum)}
        if (this.textTemplate) {
          text = ejs.render(this.textTemplate, {name, id, 'cpf': _cpf})
        } else {
          text = name
        }
        if (this.showItem) {
          this.person.push(text)
        }
        content += text
      }

      this.showFileDownload = true
      this.fileDownload = 'data:text/plain;charset=utf-8,' + content
    }
  }
}
</script>

<style>
</style>
