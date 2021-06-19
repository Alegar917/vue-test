<template>
  <div class="mx-5">
    <form action="" class="form-inline justify-content-center">
      <div class="form-row justify-content-center">
        <div class="col-auto mb-1">
          <input class="form-control text-center" type="text" placeholder="Account Number"/>
        </div>
        <div class="col-auto mb-1">
          <input class="form-control text-center" type="text" placeholder="Phone Number"/>
        </div>
        <div class="col-auto mb-1">
          <input class="form-control text-center" type="text" placeholder="First Name"/>
        </div>
        <div class="col-auto mb-1">
          <input class="form-control text-center" type="text" placeholder="Surname"/>
        </div>
        <div class="col-auto mb-1">
          <button type="btn" class="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
    <hr/>
    <table class="table table-hover" v-cloak>
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Account #</th>
        <th scope="col">Phone Number</th>
        <th scope="col">Sender</th>
        <th scope="col">Shipment Date</th>
        <th scope="col">Cosign</th>
        <th scope="col">Origin</th>
        <th scope="col">Destination</th>
        <th scope="col">BOL #</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.id">
        <th scope="row">{{ item.id }}</th>
        <td>{{ item.account }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.sender }}</td>
        <td>{{ item.shipmentDate }}</td>
        <td>{{ item.cosign }}</td>
        <td>{{ item.origin }}</td>
        <td>{{ item.destination }}</td>
        <td>{{ item.bol }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Fuse from 'fuse.js';

export default {
  name: 'ShipmentFind',
  data() {
    return {
      items: [
        {
          id: 1,
          account: 'PTS1z',
          phone: '(555)555-8297',
          sender: 'Ms. Lowe',
          shipmentDate: 'Feb.7.19',
          cosign: 'Ms. Jay',
          origin: 'Bronx NY',
          destination: 'Kingston, JA',
          bol: 'PTS1z-02',
        },
        {
          id: 2,
          account: 'PTS1z',
          phone: '(555)555-8297',
          sender: 'Ms. Lowe',
          shipmentDate: 'May.9.18',
          cosign: 'Ms. Kim',
          origin: 'Bronx NY',
          destination: 'Kingston, JA',
          bol: 'PTS1z-01',
        },
        {
          id: 3,
          account: 'PTS3y',
          phone: '(555)555-8297',
          sender: 'Mr. Hoffman',
          shipmentDate: 'June.12.19',
          cosign: 'Ms. Smith',
          origin: 'Bronx NY',
          destination: 'Kingston, JA',
          bol: 'PTS1z-03',
        },
      ],
    };
  },
  computed: {
    fuse() {
      return new Fuse(this.items, {
        keys: ['id', 'account', 'phone', 'sender', 'shipmentDate', 'cosign', 'origin', 'destination', 'bol'],
      });
    },
  },
  mounted() {
    // initializeFloatingLabels();
  },
};
</script>

<style scoped>

</style>
