<template>
  <div
    class="form-group shipment-item shadow-sm card mb-2 floating-label-container
           justify-content-center"
    style="background-color: white; width: 90%; margin: auto; border-radius: 10px;"
  >
    <div class="card-body p-3">
      <div class="form-row">
        <div class="col m-auto">
          <!-- <transition name="slide" mode="out-in"> -->
          <h5
            v-show="collapse"
            class="card-title m-auto"
          >
            {{ value.amount }} <sup>&times;</sup> &nbsp;
            {{ value.reference === '' ? 'item': value.reference}}
          </h5>
          <div v-show="!collapse" class="card-text px-5 py-4">
            <div class="form-row justify-content-center">
              <div class="col-2">
                <label class="col-form-label floating-label" for="quantity">Quantity</label>
                <input
                  class="form-control text-center"
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  v-model.number="value.amount"
                >
              </div>
              <div class="col-1">
                &times;
              </div>
              <div class="col-8">
                <label class="col-form-label floating-label" for="commodity">Commodity</label>
                <input
                  class="form-control text-center"
                  id="commodity"
                  name="commodity"
                  type="text"
                  v-model="value.reference"
                >
              </div>
            </div>
            <div class="form-row floating-label-container justify-content-center">
              <div class="col-4">
                <label class="col-form-label floating-label" for="weight">Weight</label>
                <input
                  class="form-control text-center"
                  id="weight"
                  name="weight"
                  type="number"
                  min="0"
                  v-model.number="value.weight"
                >
              </div>
              <div class="col-2">
                <label>
                  <select class="selectpicker" data-width="fit">
                    <option>lbs</option>
                    <option>kg</option>
                    <option>tons</option>
                  </select>
                </label>
              </div>
              <div class="col-4">
                <label class="col-form-label floating-label" for="volume">Volume</label>
                <input
                  class="form-control text-center"
                  name="commodity"
                  type="text"
                  v-model="value.volume"
                >
              </div>
              <div class="col-2">
                <label>
                  <select class="selectpicker" data-width="fit">
                    <option>lbs&sup3;</option>
                    <option>kg&sup3;</option>
                    <option>tons&sup3;</option>
                  </select>
                </label>
              </div>
            </div>
            <div class="form-row floating-label-container justify-content-center">
              <div class="col">
                <label class="col-form-label floating-label" for="length">Length</label>
                <input
                  class="form-control text-center"
                  id="length"
                  name="length"
                  type="number"
                  min="0"
                  v-model.number="value.length"
                >
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="volume">Width</label>
                <input
                  class="form-control text-center"
                  id="volume"
                  name="width"
                  type="text"
                  v-model="value.width"
                >
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="volume">Height</label>
                <input
                  class="form-control text-center"
                  id="height"
                  name="height"
                  type="text"
                  v-model="value.height"
                >
              </div>
              <div class="col-2">
                <label>
                  <select class="selectpicker" data-width="fit">
                    <option>in</option>
                    <option>m</option>
                  </select>
                </label>
              </div>
            </div>
            <div class="form-row floating-label-container justify-content-center">
              <div class="col-9">
                <label class="col-form-label floating-label" for="seal">Seal</label>
                <input class="form-control text-center" type="text" id="seal" name="seal"/>
              </div>
              <div class="col-3 pt-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="hazardous"
                  name="hazardous"
                />
                <label class="form-check-label" for="hazardous">
                  Hazardous?
                </label>
              </div>
            </div>
          </div>
          <!-- </transition> -->
        </div>
        <div v-show="collapse" class="col-auto">
          <button
            type="button"
            class="btn rounded"
            :class="{
              'btn-outline-secondary': removeConfirm !== 1,
              'btn-danger': removeConfirm === 1
            }"
            @click="remove(value.id)"
            @blur= "resetRemoveConfirmation()"
          >
            <b-icon-trash-fill style="margin-top: 0.2em;"></b-icon-trash-fill>
          </button>
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-outline-secondary rounded"
            :class="{ 'mb-3': !collapse }"
            @click="toggleCollapse()"
          >
            <b-icon
              :icon="collapse ? 'arrows-expand' : 'arrows-collapse'"
              style="margin-top: 0.2em"
            ></b-icon>
          </button>
          <button
            type="button"
            class="btn mb-3 rounded"
            :class="{
              'btn-outline-secondary': removeConfirm !== 1,
              'btn-danger': removeConfirm === 1,
              'd-block': !collapse,
              'd-none': collapse,
            }"
            @click="remove(value.id)"
            @blur= "resetRemoveConfirmation()"
          >
            <b-icon-trash-fill style="margin-top: 0.2em;"></b-icon-trash-fill>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShipmentItem',
  props: {
    value: Object,
    expanded: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      collapse: !this.expanded,
      removeConfirm: 0,
    };
  },
  methods: {
    remove(id) {
      this.removeConfirm += 1;
      if (this.removeConfirm === 2) {
        this.$emit('delete', id);
      }
    },
    resetRemoveConfirmation() {
      this.removeConfirm = 0;
    },
    toggleCollapse() {
      this.collapse = !this.collapse;
    },
  },
  mounted() {
    this.initFloatingLabels();
  },
};
</script>

<style scoped>
@import '../assets/styles/accordion.scss';
@import '../assets/styles/floatingLabel.scss';

.shipment-item {
  border: none;
}
</style>
