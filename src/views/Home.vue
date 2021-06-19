<template>
  <div class="home mx-5">
    <div id="quick-links">
      <h4>Quick Links</h4>
      <b-row>
        <b-col v-for="(link, index) in quickLinks" :key="index" lg="2" md="4" sm="6">
          <b-button variant="outline-dark" class="btn-block py-3 mb-2">
            <b-icon :icon="link.icon" class="mx-2"></b-icon>
            <br/>
            {{ link.name }}
          </b-button>
        </b-col>
      </b-row>
    </div>
    <div id="quick-stats" class="mt-4">
      <h4>Quick Stats</h4>
      <b-row>
        <b-col>
          <b-row class="justify-content-center">
            <b-col style="max-width: 700px;">
              <canvas
                id="shipment-chart"
                width="500"
                height="400"
                class="m-auto"
                style="max-height: 400px; max-width: 700px;"
              ></canvas>
            </b-col>
            <b-col style="max-width: 300px;">
              <canvas
                id="sparkline-chart1"
                width="500"
                height="100"
                class="mb-5 mt-4"
                style="max-height: 80px; max-width: 300px;"
              ></canvas>
              <canvas
                id="sparkline-chart2"
                width="500"
                height="100"
                class="mb-5"
                style="max-height: 80px; max-width: 300px;"
              ></canvas>
              <canvas
                id="sparkline-chart3"
                width="500"
                height="100"
                class="mb-5"
                style="max-height: 80px; max-width: 300px;"
              ></canvas>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
    <div id="feed" class="mt-4">
      <h4>Feed</h4>
      <b-row>
        <b-col>
          <b-card-group columns>
            <b-card>
              <b-card-body>
                <b-card-title>Note</b-card-title>
                <b-card-text>
                  These cards are just placeholders to get a better picture of how a
                  feed may look. Obviously this is subject to being changed. The idea of
                  the the feed is to be able to provide a quick overview of what is
                  currently happening. Since this is bound to change and is dependent on
                  time, a feed seems like an appropriate way to share news or to notify
                  everyone of something. This could be used in conjunction with
                  notifications.
                </b-card-text>
                <b-card-text>
                  <small class="text-muted" title="Sat May 17th 08:34 AM">
                    Last updated 3 mins ago
                  </small>
                </b-card-text>
              </b-card-body>
            </b-card>
            <b-card class="p-3">
              <blockquote class="blockquote mb-0 card-body">
                <p>
                  Remember to complete the form.
                </p>
                <footer class="blockquote-footer">
                  <small class="text-muted">
                    <cite> Management </cite>
                  </small>
                </footer>
              </blockquote>
            </b-card>
            <b-card>
              <b-card-body>
                <b-card-title>New Delivery Type</b-card-title>
                <b-card-text>
                  One use of the feed is to announce a new feature. Perhaps people need
                  to be informed of a new delivery type such as: <mark>Amazon Locker</mark>.
                </b-card-text>
                <b-card-text>
                  <small class="text-muted" title="Sat May 17th 08:34 AM">
                    Last updated 3 mins ago
                  </small>
                </b-card-text>
              </b-card-body>
            </b-card>
            <b-card class="bg-secondary text-white text-center p-3">
              <blockquote class="blockquote mb-0">
                <p>
                  Perhaps different colors could be used for the feed background?
                </p>
                <footer class="blockquote-footer text-white">
                  <small>
                    <cite>Development Team</cite>
                  </small>
                </footer>
              </blockquote>
            </b-card>
            <b-card class="text-center">
              <b-card-body>
                <b-card-title>Card title</b-card-title>
                <b-card-text>
                  This card has supporting text below as a natural lead-in to additional content.
                </b-card-text>
                <b-card-text>
                  <small class="text-muted">Last updated 3 mins ago</small>
                </b-card-text>
              </b-card-body>
            </b-card>
            <b-card>
              <b-card-body>
                <b-card-title>Card title that wraps to a new line</b-card-title>
                <b-card-text>
                  This is a longer card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </b-card-text>
              </b-card-body>
            </b-card>
            <b-card class="text-right">
              <blockquote class="blockquote mb-0">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a
                  ante.
                </p>
                <footer class="blockquote-footer">
                  <small class="text-muted">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                  </small>
                </footer>
              </blockquote>
            </b-card>
            <b-card>
              <b-card-body>
                <b-card-title>Card title</b-card-title>
                <b-card-text>
                  This is a wider card with supporting text below as a natural lead-in to additional
                  content. This card has even longer content than the first to show that equal
                  height action.
                </b-card-text>
                <b-card-text><small class="text-muted">Last updated 3 mins ago</small></b-card-text>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import Chart from 'chart.js';

export default {
  name: 'Home',
  data() {
    return {
      quickLinks: [
        {
          name: 'Customer',
          icon: 'people',
          href: '#',
        },
        {
          name: 'Shipments',
          icon: 'truck',
          href: '#',
        },
        {
          name: 'Receiving',
          icon: 'box-arrow-in-down',
          href: '#',
        },
        {
          name: 'Containers',
          icon: 'box-seam',
          href: '#',
        },
        {
          name: 'Administration',
          icon: 'person-bounding-box',
          href: '#',
        },
        {
          name: 'Settings',
          icon: 'gear',
          href: '#',
        },
      ],
    };
  },
  mounted() {
    const ctx = document.getElementById('shipment-chart').getContext('2d');
    const options0 = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: '# of Shipments',
          data: [33045, 35007, 50093, 104118, 118695, 125510, 173753, 189459, 212779, 246182,
            252920, 277139],
          backgroundColor: d3.lab(getComputedStyle(document.body).getPropertyValue('--hover-color')).copy({ opacity: 0.5 }).formatRgb(),
          borderColor: getComputedStyle(document.body).getPropertyValue('--primary-color'),
          borderWidth: 1,
          pointBackgroundColor: getComputedStyle(document.body).getPropertyValue('--primary-color'),
          pointHitRadius: 20,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        hover: {
          mode: 'nearest',
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
        layout: {
          padding: {
            left: 0,
            right: 10,
            top: 0,
            bottom: 0,
          },
        },
        title: {
          display: true,
          text: 'Shipment Amounts',
        },
      },
    };
    const options1 = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: '$',
          data: [16, 1, 3, 13, 10, 9, 20, 18, 6, 14, 4, 7],
          backgroundColor: d3.lab(getComputedStyle(document.body).getPropertyValue('--hover-color')).copy({ opacity: 0.5 }).formatRgb(),
          borderColor: getComputedStyle(document.body).getPropertyValue('--primary-color'),
          borderWidth: 1,
          pointBackgroundColor: getComputedStyle(document.body).getPropertyValue('--primary-color'),
          fill: false,
          pointHitRadius: 20,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        layout: {
          padding: {
            left: 0,
            right: 10,
            top: 0,
            bottom: 0,
          },
        },
        title: {
          display: true,
          text: 'Profits',
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          }],
          yAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          }],
        },
        legend: {
          display: false,
        },
      },
    };
    const options2 = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: '# of Shipments',
          data: [20, 7, 4, 12, 14, 10, 18, 1, 11, 19, 16, 3],
          backgroundColor: d3.lab(getComputedStyle(document.body).getPropertyValue('--hover-color')).copy({ opacity: 0.5 }).formatRgb(),
          borderColor: getComputedStyle(document.body).getPropertyValue('--primary-color'),
          borderWidth: 1,
          pointBackgroundColor: getComputedStyle(document.body).getPropertyValue('--primary-color'),
          fill: false,
          pointHitRadius: 20,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        layout: {
          padding: {
            left: 0,
            right: 10,
            top: 0,
            bottom: 0,
          },
        },
        title: {
          display: true,
          text: 'In Progress',
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          }],
          yAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          }],
        },
        legend: {
          display: false,
        },
      },
    };
    const options3 = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Rate',
          data: [3, 13, 16, 18, 4, 5, 9, 8, 1, 17, 10, 14],
          backgroundColor: d3.lab(getComputedStyle(document.body).getPropertyValue('--hover-color')).copy({ opacity: 0.5 }).formatRgb(),
          borderColor: getComputedStyle(document.body).getPropertyValue('--primary-color'),
          borderWidth: 1,
          pointBackgroundColor: getComputedStyle(document.body).getPropertyValue('--primary-color'),
          fill: false,
          pointHitRadius: 20,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        layout: {
          padding: {
            left: 0,
            right: 10,
            top: 0,
            bottom: 0,
          },
        },
        title: {
          display: true,
          text: 'Shipment Rate',
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          }],
          yAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          }],
        },
        legend: {
          display: false,
        },
      },
    };
    // eslint-disable-next-line no-unused-vars
    const shipmentChart = new Chart(ctx, options0);
    // eslint-disable-next-line no-unused-vars
    const sparkChart1 = new Chart(document.getElementById('sparkline-chart1').getContext('2d'), options1);
    // eslint-disable-next-line no-unused-vars
    const sparkChart2 = new Chart(document.getElementById('sparkline-chart2').getContext('2d'), options2);
    // eslint-disable-next-line no-unused-vars
    const sparkChart3 = new Chart(document.getElementById('sparkline-chart3').getContext('2d'), options3);
  },
};
</script>

<style lang="scss">
#feed .card {
  border: unset;
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
}
</style>
