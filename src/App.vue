<template>
  <div id="app">
    <TheNavbar/>
    <router-view v-cloak/>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue';

export default {
  components: {
    TheNavbar,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--font-color);
  transition: all 0.3s ease;
  min-height: 100vh;
  background: var(--bg-color);
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Roboto', sans-serif;
}

a, a:hover, a:focus {
  color: inherit !important;
  text-decoration: none !important;
  transition: all 0.3s;
  outline: none !important;
}

.no-box-shadow {
  box-shadow: none !important;
}

.btn.rounded {
  border-radius: 25px !important;
}

[v-cloak] {
  display: none;
}
</style>
