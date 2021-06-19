<template>
  <div id="sidebar">
    <b-button
      v-b-toggle.sidebar-backdrop
      variant="transparent"
      class="bg-transparent text-black no-box-shadow"
    >
      <b-iconstack font-scale="2.5">
        <b-icon stacked icon="dash" shift-v="-3" variant="dark"></b-icon>
        <b-icon stacked icon="dash" shift-v="0" variant="dark"></b-icon>
        <b-icon stacked icon="dash" shift-v="3" variant="dark"></b-icon>
      </b-iconstack>
    </b-button>
    <b-sidebar
      id="sidebar-backdrop"
      backdrop
      shadow
      bg-variant="dark"
      text-variant="light"
    >
      <ul class="list-unstyled components pt-3">
        <SidebarItem
          v-for="(nav, index) in navigation"
          :key="index"
          :dropdown="nav.dropdown"
          :href="nav.dropdown ? '' : nav.href"
          :icon="nav.icon"
          :index="index"
          :name="nav.name"
          :sub-navigation="nav.dropdown ? nav.subNavigation : []"
          :disabled="nav.hasOwnProperty('disabled') ? nav.disabled : false"
        >
          <b-dropdown-divider v-if="index === 2" class="my-3"></b-dropdown-divider>
        </SidebarItem>
      </ul>
    </b-sidebar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem.vue';

export default {
  name: 'TheSidebar.vue',
  components: { SidebarItem },
  data() {
    return {
      navigation: [
        {
          name: 'Manifest',
          icon: 'box',
          dropdown: true,
          subNavigation: [
            {
              name: 'Create Manifest',
              href: '/manifest',
            },
            {
              name: 'Find Manifests',
              href: '/manifest-find',
            },
          ],
        },
        {
          name: 'Shipment',
          icon: 'card-list',
          dropdown: true,
          subNavigation: [
            {
              name: 'Create Shipment',
              href: '/shipment',
            },
            {
              name: 'Find Shipments',
              href: '/shipment-find',
            },
          ],
        },
        {
          name: 'Dashboard',
          icon: 'columns-gap',
          dropdown: false,
          href: '/',
        },
        {
          name: 'Customer',
          icon: 'people',
          dropdown: true,
          subNavigation: [
            {
              name: 'Find Customer',
              href: '#',
              disabled: true,
            },
            {
              name: 'Add New Customer',
              href: '#',
              disabled: true,
            },
          ],
        },
        {
          name: 'Shipments',
          icon: 'truck',
          dropdown: true,
          subNavigation: [
            {
              name: 'Find Shipment',
              href: '#',
              disabled: true,
            },
            {
              name: 'List Shipment',
              href: '#',
              disabled: true,
            },
            {
              name: 'Create New',
              href: '#',
              disabled: true,
            },
            {
              name: 'Scheduled Pickup',
              href: '#',
              disabled: true,
            },
            {
              name: 'Store in Warehouse',
              href: '#',
              disabled: true,
            },
          ],
        },
        {
          name: 'Receiving',
          icon: 'box-arrow-in-down',
          dropdown: true,
          subNavigation: [
            {
              name: 'View Incoming Shipments',
              href: '#',
              disabled: true,
            },
            {
              name: 'Receive Container',
              href: '#',
              disabled: true,
            },
            {
              name: 'Add Shipment',
              href: '#',
              disabled: true,
            },
            {
              name: 'Schedule Shipment Delivery',
              href: '#',
              disabled: true,
            },
            {
              name: 'Deliver Shipment',
              href: '#',
              disabled: true,
            },
          ],
        },
        {
          name: 'Containers',
          icon: 'box-seam',
          dropdown: true,
          subNavigation: [
            {
              name: 'Create New',
              href: '#',
              disabled: true,
            },
            {
              name: 'Load Container',
              href: '#',
              disabled: true,
            },
            {
              name: 'Place in Ship',
              href: '#',
              disabled: true,
            },
            {
              name: 'Receive from Ship',
              href: '#',
              disabled: true,
            },
          ],
        },
        {
          name: 'Administration',
          icon: 'person-bounding-box',
          dropdown: true,
          subNavigation: [
            {
              name: 'Set Rates',
              href: '#',
              disabled: true,
            },
            {
              name: 'Create Manifest Report',
              href: '#',
              disabled: true,
            },
            {
              name: 'Create Bill of Lading',
              href: '#',
              disabled: true,
            },
            {
              name: 'Warehouse Inventory Report',
              href: '#',
              disabled: true,
            },
            {
              name: 'Create Delivery Report',
              href: '#',
              disabled: true,
            },
          ],
        },
      ],
    };
  },
};
</script>

<style>
#sidebar-backdrop {
  background: var(--primary-color);
  background: linear-gradient(to top left, var(--primary-color), var(--accent-color));
  color: var(--side-font-color);
}

#sidebar {
  text-align: left;
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}

#sidebar ul > li {
  position: relative;
}

#sidebar ul li a,
#sidebar ul li button {
  padding: 10px;
  display: block;
  width: 100%;
  text-align: left;
  border-radius: 0;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  position: relative;
}

#sidebar ul li a.disabled,
#sidebar ul li button.disabled {
  color: darkgray !important;
}

#sidebar ul li a:hover,
#sidebar ul li button:hover {
  color: var(--side-font-color);
  background: var(--hover-color);
}

#sidebar ul li.active>a,
#sidebar a[aria-expanded="true"],
#sidebar ul li.active>button,
#sidebar button[aria-expanded="true"] {
  color: var(--side-font-color);
}

#sidebar .dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  /*transform: translateY(-50%);*/
  transition: all .25s ease-out;
  transform: rotate(0turn);
}

#sidebar ul li>a[aria-expanded="false"].dropdown-toggle::after,
#sidebar ul li>button[aria-expanded="false"].dropdown-toggle::after {
  transition: all .25s ease-out;
  transform: rotate(-0.25turn);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: var(--secondary-color);
}

.collapse {
  margin-top: 0 !important;
}
</style>
