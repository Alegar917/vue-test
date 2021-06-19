<template>
  <form action="/manifest_form" id="manifest-form" method="POST">
    <div role="tablist" id="manifestAccord" class="accordion">
      <b-card no-body>
        <b-card-header role="tab" header-tag="header" id="exporterHeading">
          <h2 class="mb-0">
            <b-button
              block
              v-b-toggle.general
              variant="link"
              class="dropdown-toggle"
            >
              Exporter
            </b-button>
          </h2>
        </b-card-header>
        <b-collapse
          id="general"
          accordion="manifest-form"
          role="tabpanel"
        >
          <b-card-body>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col">
                <label class="col-form-label floating-label" for="exporter">Exporter</label>
                <input
                  class="form-control text-center"
                  id="exporter"
                  name="exporter"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col">
                <label class="col-form-label floating-label" for="exporteraddress">Address</label>
                <input
                  class="form-control text-center"
                  id="exporteraddress"
                  name="exporteraddress"
                  type="text"
                  value=""
                >
              </div>
            </div>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col">
                <label class="col-form-label floating-label" for="exporterphone">Phone</label>
                <input
                  class="form-control text-center"
                  id="exporterphone"
                  name="exporterphone"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div class="form-group row mt-5 mb-2 floating-label-container justify-content-center">
              <div class="col">
                <label class="col-form-label floating-label" for="agent">Forwarding Agent</label>
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
              <div class="col">
                <label class="col-form-label floating-label" for="agentphone">Phone</label>
                <input
                  class="form-control text-center"
                  id="agentphone"
                  name="agentphone"
                  type="text"
                  value=""
                />
              </div>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header id="importerHeading">
          <h2 class="mb-0">
            <b-button
              block
              v-b-toggle.importer-container
              variant="link"
              class="dropdown-toggle"
            >
              Importer
            </b-button>
          </h2>
        </b-card-header>
        <b-collapse
          id="importer-container"
          accordion="manifest-form"
          role="tabpanel"
        >
          <b-card-body>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col">
                <label class="col-form-label floating-label" for="importer">Importer</label>
                <input
                  class="form-control text-center"
                  id="importer"
                  name="importer"
                  type="text"
                  value=""
                >
              </div>
            </div>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col">
                <label class="col-form-label floating-label" for="importeraddress">Address</label>
                <input
                  class="form-control text-center"
                  id="importeraddress"
                  name="importeraddress"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col">
                <label class="col-form-label floating-label" for="importerphone">Phone</label>
                <input
                  class="form-control text-center"
                  id="importerphone"
                  name="exporterphone"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div class="form-group row mt-5 mb-2 floating-label-container justify-content-center">
              <div class="col">
                <label
                  class="col-form-label floating-label"
                  for="notifyparty"
                >Notify Party</label>
                <input
                  class="form-control text-center"
                  id="notifyparty"
                  name="notifyparty"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col">
                <label class="col-form-label floating-label" for="notifyphone">Phone</label>
                <input
                  class="form-control text-center"
                  id="notifyphone"
                  name="notifyphone"
                  type="text"
                  value=""
                />
              </div>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header id="shippingHeader">
          <h2 class="mb-0">
            <b-button
              block
              variant="link"
              class="dropdown-toggle"
              v-b-toggle.shipping
            >
              Shipping
            </b-button>
          </h2>
        </b-card-header>
        <b-collapse
          id="shipping"
          accordion="manifest-form"
          role="tabpanel"
        >
          <b-card-body>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col-sm-4 col-md-3 col-lg-2" style="padding-top: .4em;">
                Booking Details:
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="bill-of-lading">
                  Bill of Lading
                </label>
                <input
                  class="form-control text-center"
                  id="bill-of-lading"
                  name="bill-of-lading"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label
                  class="col-form-label floating-label"
                  for="exporter-references"
                >Exporter References</label>
                <input
                  class="form-control text-center"
                  id="exporter-references"
                  name="exporter-references"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col-sm-4 col-md-3 col-lg-2" style="padding-top: .4em;">
                Carriage Details:
              </div>
              <div class="col">
                <label
                  class="col-form-label floating-label"
                  for="precarriage"
                >Pre-Carriage</label>
                <input
                  class="form-control text-center"
                  id="precarriage"
                  name="precarriage"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label
                  class="col-form-label floating-label"
                  for="exporting-carrier"
                >Exporting Carrier</label>
                <input
                  class="form-control text-center"
                  id="exporting-carrier"
                  name="exporting-carrier"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label
                  class="col-form-label floating-label"
                  for="vesselvoyage"
                >Vessel/Voyage</label>
                <input
                  class="form-control text-center"
                  id="vesselvoyage"
                  name="vesselvoyage"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col-sm-4 col-md-3 col-lg-2" style="padding-top: .4em;">
                Port Details:
              </div>
              <div class="col">
                <label
                  class="col-form-label floating-label"
                  for="loading-port"
                >Loading Port</label>
                <input
                  class="form-control text-center"
                  id="loading-port"
                  name="loading-port"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label
                  class="col-form-label floating-label"
                  for="loading-pier"
                >Loading Pier</label>
                <input
                  class="form-control text-center"
                  id="loading-pier"
                  name="loading-pier"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label
                  class="col-form-label floating-label"
                  for="unloading-port"
                >Unloading Port</label>
                <input
                  class="form-control text-center"
                  id="unloading-port"
                  name="unloading-port"
                  type="text"
                  value=""
                >
              </div>
            </div>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col-sm-4 col-md-3 col-lg-2" style="padding-top: .4em;">
                Delivery Details:
              </div>
              <div class="col">
                <label
                  class="col-form-label floating-label"
                  for="delivery-type"
                >Delivery Type</label>
                <input
                  class="form-control text-center"
                  id="delivery-type"
                  name="delivery-type"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="origin">Origin</label>
                <input
                  class="form-control text-center"
                  id="origin"
                  name="origin"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="destination">Destination</label>
                <input
                  class="form-control text-center"
                  id="destination"
                  name="destination"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col-sm-4 col-md-3 col-lg-2" style="padding-top: .4em;">
                Freight Details:
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="prepaid">Prepaid</label>
                <input
                  class="form-control text-center"
                  id="prepaid"
                  name="prepaid"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="filenum">File #</label>
                <input
                  class="form-control text-center"
                  id="filenum"
                  name="filenum"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="arrival-date">
                  Arrival Date
                </label>
                <input
                  class="form-control text-center"
                  id="arrival-date"
                  name="arrival-date"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label
                  class="col-form-label floating-label"
                  for="shipped-date"
                >Shipped Date</label>
                <input
                  class="form-control text-center"
                  id="shipped-date"
                  name="shipped-date"
                  type="text"
                  value=""
                />
              </div>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body>
        <b-card-header id="containerHeader">
          <h2 class="mb-0">
            <b-button
              block
              v-b-toggle.container
              variant="link"
              class="dropdown-toggle"
            >
              Container
            </b-button>
          </h2>
        </b-card-header>
        <b-collapse
          id="container"
          accordion="manifest-form"
          role="tabpanel"
        >
          <b-card-body class="pt-4">
            <ContainerWidget></ContainerWidget>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col-sm-5 col-md-4 col-lg-3" style="padding-top: .4em;">
                Marks/Numbers
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="container-size">
                  Container Size
                </label>
                <input
                  class="form-control text-center"
                  id="container-size"
                  name="container-size"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="container-num">
                  Container Number
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
                <label class="col-form-label floating-label" for="aes-itn">AES ITN#</label>
                <input
                  class="form-control text-center"
                  id="aes-itn"
                  name="aes-itn"
                  type="text"
                  value=""
                />
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="seal">Seal</label>
                <input
                  class="form-control text-center"
                  id="seal"
                  name="seal"
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div class="form-group row mb-2 floating-label-container justify-content-center">
              <div class="col-sm-5 col-md-4 col-lg-3" style="padding-top: .4em;">
                Commodities Description
              </div>
              <div class="col">
                <label class="col-form-label floating-label" for="description">Description</label>
                <input
                  class="form-control text-center"
                  id="description"
                  name="description"
                  type="text"
                  value=""
                />
              </div>
            </div>
          </b-card-body>
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
</template>

<script>
import ContainerWidget from './ContainerWidget.vue';

export default {
  name: 'ManifestFormCreate',
  components: { ContainerWidget },
  mounted() {
    this.initFloatingLabels();
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/accordion.scss';
@import '../assets/styles/floatingLabel.scss';
</style>
