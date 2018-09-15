<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Dev tools
          <div slot="subtitle">Executando devtools v{{ version }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Ferramentas</q-list-header>
          <q-item to="/home">
            <q-item-side icon="home" />
            <q-item-main label="Home" sublabel="página inicial" />
          </q-item>
          <q-item to="/cpf">
              <q-item-side icon="account_box" />
              <q-item-main label="CPF" sublabel="validação, geração" />
          </q-item>

        <q-item to="/cnpj">
          <q-item-side icon="account_balance" />
          <q-item-main label="CNPJ" sublabel="validação, geração" />
        </q-item>
      </q-list>
    </q-layout-drawer><S></S>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    version () {
      return this.$store.state.devtools.version
    }
  },
  methods: {
    openURL,
    teste () {
      this.$store.commit('devtools/increment')
      console.log('store ', this.$store.state.devtools.version)
    }
  }
}
</script>

<style>
</style>
