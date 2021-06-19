<template>
  <div class="mt-3" id="item-list">
    <h5>ITEMS</h5>
    <div v-for="(item, idx) in items" :key="idx">
      <ShipmentItem
        v-model="items[idx]"
        :expanded="false"
        :key="item.id"
        @delete="removeItem"
      />
    </div>
    <button
      type="button"
      class="btn btn-primary rounded"
      @click="addNewItem()"
      style="width: 40px; height: 40px;"
    >
      <b-icon-plus style="margin-left: -3px;"></b-icon-plus>
    </button>
    <h6 v-if="items.length > 0">
      Quantities:
      <span class="badge badge-pill badge-primary">
        {{ totalAmount }}
      </span>
    </h6>
  </div>
</template>

<script>
import ShipmentItem from './ShipmentItem.vue';

export default {
  name: 'ShipmentList',
  props: ['items'],
  computed: {
    stats() {
      return this.items.reduce(
        (obj, item) => {
          Object.keys(item).forEach((elem) => {
            if (!Object.prototype.hasOwnProperty.call(obj, elem)) {
              // eslint-disable-next-line no-param-reassign
              obj[elem] = 0;
            }
            if (item[elem] !== undefined && typeof item[elem] === 'number' && elem !== 'id') {
              // eslint-disable-next-line no-param-reassign
              obj[elem] += item[elem];
            }
          });
          return obj;
        }, {},
      );
    },
    totalAmount() {
      return this.stats.amount;
    },
  },
  methods: {
    removeItem(id) {
      this.$emit('remove', id);
    },
    addNewItem() {
      this.$emit('add');
    },
  },
  components: { ShipmentItem },
};
</script>

<style scoped>

</style>
