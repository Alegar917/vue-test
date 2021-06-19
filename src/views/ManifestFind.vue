<template>
  <div id="innerContent" class="mx-5">
    <form
      action=""
      class="form-inline justify-content-center w-100"
      v-cloak
      @submit.prevent="advancedSearch()"
    >
      <div class="form-row justify-content-center w-100" v-show="advanced">
        <div class="col-auto mb-1">
          <input
            class="form-control text-center"
            type="text"
            placeholder="Manifest #"
            v-model="manifest"
          />
        </div>
        <div class="col-auto mb-1">
          <input
            class="form-control text-center"
            type="text"
            placeholder="Destination"
            v-model="destination"
          />
        </div>
        <div class="col-auto mb-1">
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
      <div class="form-row justify-content-center w-100" v-show="!advanced">
        <div class="col mb-1 w-100">
          <input
            class="form-control text-center width-transition"
            :class="{
            'w-75': search !== '',
            'w-25': search === '',
          }"
            v-model="search"
            @input="searchResults()"
            type="text"
            placeholder="Search"
            style="border-radius: 25px;"
          />
        </div>
      </div>
    </form>
    <!-- <input type="checkbox" id="checkbox" v-model="advanced"> -->
    <!-- <label for="checkbox">Advanced</label> -->
    <hr/>
    <table class="table table-hover" v-cloak>
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Manifest #</th>
        <th scope="col"># of Containers</th>
        <th scope="col">Exporter</th>
        <th scope="col">ETD</th>
        <th scope="col">ETA</th>
        <th scope="col">Loading Port</th>
        <th scope="col">Unload Port</th>
        <th scope="col">AES</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(result, index) in results.slice(0, 30)" :key="index">
          <th scope="row">{{ result.item.id }}</th>
          <td>{{ result.item.manifestId }}</td>
          <td>{{ result.item.numcontainers }}</td>
          <td>{{ result.item.exporter }}</td>
          <td>{{ result.item.etd }}</td>
          <td>{{ result.item.eta }}</td>
          <td>{{ result.item.loadingPort }}</td>
          <td>{{ result.item.unloadPort }}</td>
          <td>{{ result.item.aes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Fuse from 'fuse.js';

export default {
  name: 'ManifestFind',
  data() {
    return {
      items: [],
      advanced: false,
      search: '',
      results: [],
      manifest: '',
      destination: '',
    };
  },
  computed: {
    fuse() {
      return new Fuse(this.items, {
        keys: ['id', 'manifestId', 'numcontainers', 'exporter', 'eta', 'etd', 'loadingPort', 'unloadPort', 'aes'],
        useExtendedSearch: true,
      });
    },
  },
  methods: {
    searchResults() {
      this.results = this.fuse.search(this.search);
    },
    randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    },
    advancedSearch() {
      this.search = '';
      this.results = this.fuse.search(`${this.manifest} | ${this.destination}`);
    },
  },
  mounted() {
    // initializeFloatingLabels();
    for (let i = 0; i < 200; i += 1) {
      const start = this.randomDate(new Date(2012, 0, 1), new Date());
      this.items.push({
        id: i,
        manifestId: Math.random().toString(36).substring(2, 10),
        numcontainers: Math.ceil(Math.random() * 10),
        exporter: 'Gunter Inc.',
        etd: start.toDateString(),
        eta: this.randomDate(start, new Date()).toDateString(),
        loadingPort: Math.random() > 0.5 ? 'Brooklyn NY' : 'San Francisco CA',
        unloadPort: Math.random() > 0.5 ? 'Kingston JA' : 'Montego Bay JA',
        aes: Math.random().toString(36).substring(2, 15),
      });
    }
  },
};
</script>

<style scoped>
.width-transition {
  transition: width 200ms ease;
}

.form-control {
  box-shadow: none;
}

.form-control:focus {
  outline: var(--accent-color);
}
</style>
