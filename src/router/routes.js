
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/home', component: () => import('pages/Index.vue') },
      { path: '/cpf', component: () => import('pages/Cpf.vue') },
      { path: '/htmlentityconvert', component: () => import('pages/HtmlEntityConvert.vue') },
      { path: '/crypto101', component: () => import('pages/Crypto101.vue') },
      { path: '/crypto-pbkdf2', component: () => import('pages/CryptoPbkdf2.vue') },
      { path: '/crypto-hash', component: () => import('pages/CryptoHash.vue') },
      { path: '/cnpj', component: () => import('pages/Cnpj.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
