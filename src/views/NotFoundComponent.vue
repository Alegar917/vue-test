<template>
  <div class="mx-5">
    <b-jumbotron header="404" lead="Sorry, this page could not be found...">
      <b-button variant="dark" href="/" class="text-white">
        <b-icon-house></b-icon-house>
        <span class="ml-2">Go to homepage</span>
      </b-button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: 'NotFoundComponent.vue',
};
</script>

<style scoped>
.btn {
  color: white !important;
}
</style>
