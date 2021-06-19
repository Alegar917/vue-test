<template>
  <div class="mx-5">
    <b-row>
      <b-col class="p-5">
        <b-icon-plus font-scale="3"></b-icon-plus><br/>
        New
      </b-col>
      <b-col class="p-5">
        <b-icon-files font-scale="3"></b-icon-files><br/>
        Copy to New
      </b-col>
      <div class="col-sm p-5">
        <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-printer" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 2H5a1 1 0 0 0-1 1v2H3V3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h-1V3a1 1 0 0 0-1-1zm3
            4H2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1v1H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2
            2v3a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z"/>
          <path fill-rule="evenodd" d="M11 9H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1
            0 0 0-1-1zM5 8a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H5z"/>
          <path d="M3 7.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
        </svg><br/>
        Print
      </div>
    </b-row>
    <form action="/" method="POST">
      <div role="tablist" id="bolAccord" class="accordion">
        <b-card no-body>
          <b-card-header role="tab" header-tag="header" id="pickupHeading">
            <h2 class="mb-0">
              <b-button
                block
                v-b-toggle.pickup
                variant="link"
                class="dropdown-toggle"
              >
                Schedule Pickup
              </b-button>
            </h2>
          </b-card-header>
          <b-collapse
            id="pickup"
            accordion="shipment-form"
            role="tabpanel"
          >
            <b-card-body>
              <div class="form-group row mb-2 floating-label-container justify-content-center">
                <div class="col">
                  <label class="col-form-label floating-label" for="bol">Bill of Lading</label>
                  <input class="form-control text-center" id="bol" name="bol" type="text" value=""/>
                </div>
                <div class="col">
                  <label class="col-form-label floating-label" for="booked">Date Booked</label>
                  <input
                    class="form-control text-center"
                    id="booked"
                    name="booked"
                    type="text"
                    value=""
                  />
                </div>
              </div>
              <div
                class="form-group row mb-2 floating-label-container justify-content-center
                       align-items-center">
                <div class="col-2">
                  <span>Pickup Details:</span>
                </div>
                <div class="col">
                  <label class="col-form-label floating-label" for="pickup-driver">
                    Pickup Driver
                  </label>
                  <input
                    class="form-control text-center"
                    id="pickup-driver"
                    name="pickup-driver"
                    type="text" value=""
                  />
                </div>
                <div class="col">
                  <label class="col-form-label floating-label" for="pickup-interval">
                    Pickup Interval
                  </label>
                  <input
                    class="form-control text-center"
                    id="pickup-interval"
                    name="pickup-interval"
                    type="text"
                    value=""
                  />
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body>
          <b-card-header role="tab" header-tag="header" id="senderHeading">
            <h2 class="mb-0">
              <b-button
                block
                v-b-toggle.sender
                variant="link"
                class="dropdown-toggle"
              >
                Sender
              </b-button>
            </h2>
          </b-card-header>
          <b-collapse
            id="sender"
            accordion="shipment-form"
            role="tabpanel"
          >
            <b-card-body>
              <div class="form-group row mb-2 floating-label-container justify-content-center">
                <div class="col">
                  <label class="col-form-label floating-label" for="account-num">Account #</label>
                  <input
                    class="form-control text-center"
                    id="account-num"
                    name="account-num"
                    type="text"
                    value=""
                  />
                </div>
              </div>
              <div class="form-group row mb-2 floating-label-container justify-content-center">
                <div class="col">
                  <label class="col-form-label floating-label" for="shipper">Shipper</label>
                  <input
                    class="form-control text-center"
                    id="shipper"
                    name="shipper"
                    type="text"
                    value=""
                  />
                </div>
              </div>
              <div class="form-group row mb-2 floating-label-container justify-content-center">
                <div class="col">
                  <label class="col-form-label floating-label" for="address">Street</label>
                  <input
                    class="form-control text-center"
                    id="address"
                    name="address"
                    type="text"
                    value=""
                  />
                </div>
              </div>
              <div class="form-group row mb-2 floating-label-container justify-content-center">
                <div class="col">
                  <label class="col-form-label floating-label" for="city">City</label>
                  <input
                    class="form-control text-center"
                    id="city"
                    name="city"
                    type="text"
                    value=""
                  />
                </div>
                <div class="col">
                  <label class="col-form-label floating-label" for="state">State</label>
                  <input
                    class="form-control text-center"
                    id="state"
                    name="state"
                    type="text"
                    value=""
                  />
                </div>
                <div class="col-3">
                  <label class="col-form-label floating-label" for="zip">Zip Code</label>
                  <input
                    class="form-control text-center"
                    id="zip"
                    name="zip"
                    type="text"
                    value=""
                  />
                </div>
              </div>
              <div class="form-group row mb-2 floating-label-container justify-content-center">
                <div class="col">
                  <label class="col-form-label floating-label" for="phone">Phone Number</label>
                  <input
                    class="form-control text-center"
                    id="phone"
                    name="phone"
                    type="text"
                    value=""
                  />
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body>
          <b-card-header id="consigneeHeader">
            <h2 class="mb-0">
              <b-button
                block
                v-b-toggle.consignee
                variant="link"
                class="dropdown-toggle"
              >
                Cosignee
              </b-button>
            </h2>
          </b-card-header>
          <b-collapse
            id="consignee"
            accordion="shipment-form"
            role="tabpanel"
          >
            <b-card-body>
              <div class="form-group row mb-2 floating-label-container justify-content-center">
                <div class="col">
                  <label class="col-form-label floating-label" for="consignee-name">
                    Consignee
                  </label>
                  <input
                    class="form-control text-center"
                    id="consignee-name"
                    name="consignee-name"
                    type="text"
                    value=""
                  />
                </div>
              </div>
              <div class="form-group row mb-2 floating-label-container justify-content-center">
                <div class="col">
                  <label class="col-form-label floating-label" for="consignee-address">
                    Street
                  </label>
                  <input
                    class="form-control text-center"
                    id="consignee-address"
                    name="consignee-address"
                    type="text"
                    value=""
                  />
                </div>
              </div>
              <div class="form-group row mb-2 floating-label-container justify-content-center">
                <div class="col">
                  <label class="col-form-label floating-label" for="consignee-city">City</label>
                  <input
                    class="form-control text-center"
                    id="consignee-city"
                    name="consignee-city"
                    type="text"
                    value=""
                  />
                </div>
                <div class="col">
                  <label class="col-form-label floating-label" for="consignee-state">State</label>
                  <input
                    class="form-control text-center"
                    id="consignee-state"
                    name="consignee-state"
                    type="text"
                    value=""
                  />
                </div>
                <div class="col-3">
                  <label class="col-form-label floating-label" for="consignee-zip">Zip Code</label>
                  <input
                    class="form-control text-center"
                    id="consignee-zip"
                    name="consignee-zip"
                    type="text"
                    value=""
                  />
                </div>
              </div>
              <div class="form-group row mb-2 floating-label-container justify-content-center">
                <div class="col">
                  <label class="col-form-label floating-label" for="consignee-phone">
                    Phone Number
                  </label>
                  <input
                    class="form-control text-center"
                    id="consignee-phone"
                    name="consignee-phone"
                    type="text"
                    value=""
                  />
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body>
          <b-card-header id="shipmentHeader">
            <h2 class="mb-0">
              <b-button
                block
                v-b-toggle.shipments
                variant="link"
                class="dropdown-toggle"
              >
                Shipment List
              </b-button>
            </h2>
          </b-card-header>
          <b-collapse
            id="shipments"
            accordion="shipment-form"
            role="tabpanel"
          >
            <ShipmentList
              :items="items"
              @add="addNewItem"
              @remove="removeItem"
            ></ShipmentList>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col-sm-4 col-md-3 col-lg-2" style="padding-top: .4em;">
                Charges:
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="freight">Freight</label>
                <input
                  class="form-control text-center"
                  id="freight"
                  name="freight"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="pickup">Pickup</label>
                <input
                  class="form-control text-center"
                  id="pickup"
                  name="pickup"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="handling">Handling</label>
                <input
                  class="form-control text-center"
                  id="handling"
                  name="handling"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="insurance">Insurance</label>
                <input
                  class="form-control text-center"
                  id="insurance"
                  name="insurance"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="subtotal">Subtotal</label>
                <input
                  class="form-control text-center"
                  id="subtotal"
                  name="subtotal"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col-sm-4 col-md-3 col-lg-2" style="padding-top: .4em;">
                Payment:
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="amount">Amount</label>
                <input
                  class="form-control text-center"
                  id="amount"
                  name="amount"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="paid-on">Paid On</label>
                <input
                  class="form-control text-center"
                  id="paid-on"
                  name="paid-on"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="balance">Order Balance</label>
                <input
                  class="form-control text-center"
                  id="balance"
                  name="balance"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col-sm-4 col-md-3 col-lg-2" style="padding-top: .4em;">
                Delivery Details:
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="delivery-type">
                  Delivery Type
                </label>
                <input
                  class="form-control text-center"
                  id="delivery-type"
                  name="delivery-type"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="port">Port</label>
                <input class="form-control text-center" id="port" name="port" type="text" value="">
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="agent">Agent</label>
                <input
                  class="form-control text-center"
                  id="agent"
                  name="agent"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col-sm-4 col-md-3 col-lg-2" style="padding-top: .4em;">
                Shipping Details:
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="container-num">
                  Container #
                </label>
                <input
                  class="form-control text-center"
                  id="container-num"
                  name="container-num"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="voyage">Voyage</label>
                <input
                  class="form-control text-center"
                  id="voyage"
                  name="voyage"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="arrival-date">Arrival Date</label>
                <input
                  class="form-control text-center"
                  id="arrival-date"
                  name="arrival-date"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="shipped-date">Shipped Date</label>
                <input
                  class="form-control text-center"
                  id="shipped-date"
                  name="shipped-date"
                  type="text"
                  value=""
                />
              </div>
            </div>
          </b-collapse>
        </b-card>
      </div>
      <input
        class="btn btn-primary rounded-pill mt-3"
        id="submit"
        name="submit"
        type="submit"
        value="Submit"
      />
    </form>
  </div>
</template>

<script>
import ShipmentList from '../components/ShipmentList.vue';

export default {
  name: 'Shipment.vue',
  data() {
    return {
      items: [
        {
          id: 1,
          amount: 0,
          weight: 0,
          length: 0,
          height: 0,
          width: 0,
          volume: 0,
          hazardous: false,
          reference: '',
        },
        {
          id: 2,
          amount: 0,
          weight: 0,
          length: 0,
          height: 0,
          width: 0,
          volume: 0,
          hazardous: false,
          reference: '',
        },
        {
          id: 3,
          amount: 1,
          weight: 0,
          length: 0,
          height: 0,
          width: 0,
          volume: 0,
          hazardous: false,
          reference: '',
        },
      ],
    };
  },
  methods: {
    addNewItem() {
      this.items.push({
        id: this.items[this.items.length - 1].id + 1,
        amount: 0,
        weight: 0,
        length: 0,
        height: 0,
        width: 0,
        volume: 0,
        hazardous: false,
        reference: '',
      });
    },
    removeItem(id) {
      this.items.splice(this.items.findIndex((item) => item.id === id), 1);
    },
  },
  mounted() {
    this.initFloatingLabels();
  },
  components: { ShipmentList },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/accordion.scss';
@import '../assets/styles/floatingLabel.scss';
</style>
