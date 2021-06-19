<template>
  <div class="item row shadow-sm" :data-bol="item.id">
    <div class="col-3 m-auto">{{ item.id }}</div>
    <div
      class="col m-auto"
      style="white-space: nowrap; overflow-y: hidden; text-overflow: ellipsis;"
    >{{ item.exporter }}</div>
    <div
      class="col m-auto"
      style="white-space: nowrap; overflow-y: hidden; text-overflow: ellipsis;"
    >{{ item.shipper }}</div>
  </div>
</template>

<script>
export default {
  name: 'ContainerWidgetItem',
  props: ['item'],
};
</script>

<style scoped>

</style>
