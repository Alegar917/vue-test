<template>
  <div
    class="item mb-0 shadow-sm pl-1 pr-1 justify-content-center"
    :class="{
      'bg-dark text-white': name === value
    }"
    :title="name"
    @click="updateActive(name)"
    v-if="name !== 'warehouse'"
    style="display: flex;"
  >
    <div
      style="
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        direction: rtl;
      "
    >
      {{ name }}
    </div>
    <div class="pl-1">
      <b-icon-trash-fill
        @click="removeContainer(name)"
      ></b-icon-trash-fill>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContainerWidgetSummary',
  props: ['item', 'name', 'value'],
  methods: {
    updateActive(value) {
      this.$emit('input', value);
    },
    removeContainer(value) {
      this.$emit('remove_container', value);
    },
  },
};
</script>

<style scoped>

</style>
