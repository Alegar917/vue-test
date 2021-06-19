<template>
  <li>
    <slot></slot>
    <b-button
      v-b-toggle="'collapse-' + index"
      variant="transparent"
      class="text-white"
      :class="{
            'dropdown-toggle': dropdown,
            'disabled': disabled,
          }"
      :href="dropdown ? '' : href"
    >
      <b-icon :icon="icon" class="mx-2"></b-icon>
      {{ name }}
    </b-button>
    <b-collapse
      :id="'collapse-' + index"
      accordion="nav-accordion"
      v-if="dropdown"
    >
      <ul class="list-unstyled">
        <li v-for="(subNav, subIdx) in subNavigation" :key="subIdx">
          <router-link
            :to="subNav.href"
            class="btn-link"
            :class="{
              disabled: subNav.hasOwnProperty('disabled') ? subNav.disabled : false
            }"
          >{{ subNav.name }}</router-link>
        </li>
      </ul>
    </b-collapse>
  </li>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    dropdown: Boolean,
    index: Number,
    href: String,
    icon: String,
    name: String,
    subNavigation: String,
    disabled: Boolean,
  },
};
</script>

<style scoped>

</style>
