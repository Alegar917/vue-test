import { shallowMount } from '@vue/test-utils';
import SidebarItem from '@/components/SidebarItem.vue';

import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

describe('SidebarItem.vue', () => {
  it('renders props.href when passed', () => {
    const name = 'Test';
    const wrapper = shallowMount(SidebarItem, {
      propsData: { name },
    });
    expect(wrapper.text()).toMatch(name);
  });
});
