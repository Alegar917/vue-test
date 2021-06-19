import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
import router from './router';

import './assets/styles/custom.scss';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.mixin({
  methods: {
    initFloatingLabels() {
      const forms = document.getElementsByTagName('form');
      for (let i = 0; i < forms.length; i += 1) {
        const inputs = forms[i].querySelectorAll('input, textarea, select');
        for (let j = 0; j < inputs.length; j += 1) {
          const label = inputs[j].previousElementSibling;
          if (label) {
            if (inputs[j].value === '') {
              label.classList.remove('active');
            } else {
              label.classList.add('active');
            }

            inputs[j].addEventListener('blur', () => {
              if (inputs[j].value === '') {
                label.classList.remove('active');
              }
            });

            inputs[j].addEventListener('focus', () => {
              label.classList.add('active');
            });
          }
        }
      }
    },
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
