import Vue from 'vue'
import App from './App.vue'
import { vIntersection } from './directives'

Vue.config.productionTip = false

Vue.directive('intersection', vIntersection);

new Vue({
  render: h => h(App),
}).$mount('#app')
