<template>
  <div class="mb-3">
    <b-navbar toggleable="lg" type="light" variant="transparent">
      <TheSidebar/>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right id="user-dropdown">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <b-avatar
                :src="profile"
                badge="1"
                badge-top
                badge-offset="-3px"
                badge-variant="danger"
                size="2em"
                class="user-icon shadow-sm"
              ></b-avatar>
            </template>
            <b-dropdown-item href="#">
              <span>Admin</span>
              <br/>
              <b-badge pill variant="light">admin</b-badge>
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#" class="text-left">
              <b-icon-bell class="mr-1"></b-icon-bell>
              Notifications
            </b-dropdown-item>
            <b-dropdown-item href="#" class="text-left">
              <b-icon-gear class="mr-1"></b-icon-gear>
              Settings
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#">
              Sign out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar.vue';

export default {
  name: 'TheNavbar.vue',
  data() {
    return {
      profile: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    };
  },
  components: {
    TheSidebar,
  },
};
</script>

<style scoped>
.user-icon {
  border-radius: 50%;
}

/deep/ #user-dropdown__BV_toggle_:focus {
  outline: none;
  box-shadow: none;
}

/deep/ #user-dropdown__BV_toggle_::after {
  border-top: 0.4em solid;
  border-right: 0.4em solid transparent;
  border-bottom: 0;
  border-left: 0.4em solid transparent;
}

/deep/ #user-dropdown__BV_toggle_:focus::after {
  border-top: 0.4em solid var(--hover-color);
}

/deep/ #user-dropdown__BV_toggle_[aria-expanded="false"].dropdown-toggle::after {
  transition: all .25s ease-out;
  transform: scaleY(1);
  vertical-align: middle;
}

/deep/ #user-dropdown__BV_toggle_.dropdown-toggle::after {
  transition: all .25s ease-out;
  transform: scaleY(-1);
  vertical-align: middle;
}

/deep/ .dropdown-menu {
  left: auto;
  right: 0;
  background: var(--primary-color) !important;
  color: var(--side-font-color) !important;
  opacity: 0;
  transition: all 0.25s ease;
  display: block !important;
  visibility: hidden;
  border: none !important;
  text-align: center !important;
}

/deep/ .dropdown-menu.show {
  transition: all 0.25s ease;
  visibility: visible;
  opacity: 0.98;
  height: auto;
}

/deep/ #user-dropdown .dropdown-menu {
  box-shadow: 0 .25rem .5rem rgba(0,0,0,.15) !important;
}

/deep/ .dropdown-menu a {
  color: var(--side-font-color) !important;
}

/deep/ .dropdown-menu a:hover {
  background-color: var(--hover-color) !important;
}
</style>
