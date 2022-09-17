import Vue from 'vue'
import App from './App.vue'
import { vIntersection } from './directives/v-intersection'

Vue.config.productionTip = false

Vue.directive('intersection', {
  bind: vIntersection
});

new Vue({
  render: h => h(App),
}).$mount('#app')
