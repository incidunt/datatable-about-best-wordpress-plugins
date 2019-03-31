import Vue from 'vue'
// import BootstrapVue from "bootstrap-vue"
import Table from 'bootstrap-vue/es/components/table'
import Button from 'bootstrap-vue/es/components/button'
import Card from 'bootstrap-vue/es/components/card'
import Link from 'bootstrap-vue/es/components/link'
import Image from 'bootstrap-vue/es/components/image'
import Spinner from 'bootstrap-vue/es/components/spinner'
import Form from 'bootstrap-vue/es/components/form'
import FormGroup from 'bootstrap-vue/es/components/form-group'
import InputGroup from 'bootstrap-vue/es/components/input-group'
import FormInput from 'bootstrap-vue/es/components/form-input'
import Layout from 'bootstrap-vue/es/components/layout'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

// Vue.use(BootstrapVue)
Vue.use(Layout)
Vue.use(Form)
Vue.use(FormGroup)
Vue.use(FormInput)
Vue.use(InputGroup)
Vue.use(Spinner)
Vue.use(Table)
Vue.use(Button)
Vue.use(Card)
Vue.use(Link)
Vue.use(Image)

new Vue({
  el: '#app',
  render: h => h(App)
})
