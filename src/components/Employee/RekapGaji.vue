<template>
  <div class="main">
    <h1>Rekap Gaji</h1>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#" style="color: #cb7de2">Home</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Profile Gaji Employee
        </li>
      </ol>
    </nav>

    <hr />

    <div class="employee-container employee-detail">
      <div class="employee-detail-title d-flex justify-content-between mt-4">
        <h1 style="padding-right: 100px">Rekap Gaji Employee</h1>
      </div>
      <div
        class="employee-data mt-6 d-flex align-items-center flex-column"
        style="gap: 10px"
      >
        <img
          class="mb-6"
          width="200"
          :src="getUser?.urlprofile || require('@/assets/avatar.png')"
          alt=""
        />
        <table class="table table-striped table-employee">
          <tbody>
            <tr>
              <th scope="row">Full Name</th>
              <td>{{ getUser?.name || "Name" }}</td>
            </tr>
            <tr>
              <th scope="row">ID</th>
              <td>{{ getUser?.uuid || "ID" }}</td>
            </tr>
            <tr>
              <th scope="row">Position</th>
              <td>{{ getUser?.position || "Position" }}</td>
            </tr>
            <tr>
              <th scope="row">Jumlah HKA</th>
              <td>{{ hkaAmount }}</td>
            </tr>
            <tr>
              <th scope="row">Jumlah HKE</th>
              <td>{{ hkeAmount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="select-month mt-5">
        <p>Month</p>
        <v-text-field
          outlined
          type="month"
          class="form-input"
          clearable
          dense
        ></v-text-field>
      </div>

      <div class="salary-earning d-flex">
        <div class="salary-detail" style="width: 100%">
          <table class="table table-salary">
            <tbody>
              <tr>
                <td>Gaji Pokok (HKE @150.000)</td>
                <td>IDR 3.000.000</td>
              </tr>
              <tr>
                <td>Uang Makan (HKE @20.000)</td>
                <td>IDR 500.000</td>
              </tr>
              <tr>
                <td>Transport (HKE @20.000)</td>
                <td>IDR 400.000</td>
              </tr>
              <tr
                style="
                  border-top: 3px solid black;
                  border-bottom: 3px solid black;
                "
              >
                <th>TOTAL PENERIMAAN</th>
                <td>
                  IDR <span style="background-color: #2eb158">3.900.000</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="salary-graph">
          <apexchart
            v-if="series.length && options.labels.length"
            width="380"
            type="pie"
            :options="options"
            :series="series"
          ></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import ApexChart from "vue-apexcharts";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "RekapGajiEmployee",
  components: { ApexChart },
  data() {
    return {
      hkaAmount: 0,
      hkeAmount: 0,
      options: {
        chart: {
          type: "pie",
          events: {
            dataPointSelection: (event, chartContext, config) => {
              console.log(
                "Selected: ",
                this.options.labels[config.dataPointIndex]
              );
            },
          },
        },
        labels: ["Gaji Pokok", "Uang Makan", "Transport"], // Ensure no undefined labels
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                onItemHover: {
                  highlightDataSeries: false, // Disable hover effect
                },
              },
            },
          },
        ],
        legend: {
          onItemHover: {
            highlightDataSeries: false, // Disable hover effect if needed
          },
        },
      },
      series: [3000000, 500000, 400000], // Ensure no undefined values
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    ...mapActions(["logout", "fetchUserData"]),
    validateData() {
      // Ensure that both labels and series are defined and non-empty
      if (
        !this.series ||
        !this.options.labels ||
        this.series.length !== this.options.labels.length ||
        this.series.includes(undefined) ||
        this.options.labels.includes(undefined)
      ) {
        console.error("Series and labels data mismatch or undefined");
        this.series = [0]; // Fallback in case of undefined data
        this.options.labels = ["Unknown"];
      }
    },
    getStatistics() {
      // Making a GET request to /your-endpoint (Axios will automatically use the base URL)
      axios
        .get("/statistics")
        .then((response) => {
          this.hkaAmount = response.data.HKA;

          this.hkeAmount = response.data.HKE;
        })
        .catch((error) => {
          console.error("There was an error fetching data:", error);
        });
    },
  },
  mounted() {
    this.validateData();
    this.fetchUserData();
    this.getStatistics();
  },
};
</script>
  
  <style scoped>
.main {
  margin: 10px;
}
.breadcrumb {
  background: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
  font-size: 12px;
  font-weight: 400;
}

h1 {
  font-size: 32px;
  font-weight: 800;
}

nav {
  padding: 0 !important;
}

.employee-detail {
  background-color: white;
  padding: 32px;
  border-radius: 12px;
}

.employee-filter {
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.employee-card {
  border: 0.3px solid #9b9b9b;
  border-radius: 12px;
  padding: 20px 40px 20px 40px;
  margin-bottom: 20px;
}

.employee-card p {
  font-size: 12px;
  font-weight: 400;
}

.employee-card h6 {
  font-size: 16px;
  font-weight: 600;
}

.badge-green {
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.badge-red {
  background-color: #f44336;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

::v-deep.v-text-field {
  width: 400px !important;
}

.employee-container {
  margin-top: 30px;
  background-color: white;
  border-radius: 8px;
  padding: 16px 20px 16px 20px;
}

.table-employee > tbody > tr:nth-child(2n + 1) > td,
.table-employee > tbody > tr:nth-child(2n + 1) > th {
  background-color: #f3d2fb;
  border: none !important;
}

.table-employee > tbody > tr:nth-child(2n + 1) > th {
  border-radius: 12px 0px 0px 12px;
}

.table-employee > tbody > tr:nth-child(2n + 1) > td:nth-child(2) {
  border-radius: 0px 12px 12px 0px;
}

.btn-add {
  background-color: #51ab8c;
  border-radius: 4px;
  padding: 6px 12px 6px 12px;
  color: white;
  font-size: 16px;
  font-weight: 400;
}
.form-input {
  width: 150px !important;
}

.v-icon {
  color: white;
}

.edit-btn {
  padding: 6px;
  gap: 8px;
  border-radius: 4px;
  border: 1px 0px 0px 0px;
  background-color: #51ab8c;
  color: white;
  font-size: 16px;
  font-weight: 400;
}

.delete-btn {
  padding: 6px;
  gap: 8px;
  border-radius: 4px;
  border: 1px 0px 0px 0px;
  background-color: #e74c3c;
  color: white;
  font-size: 16px;
  font-weight: 400;
}

.suspend-btn {
  padding: 6px;
  gap: 8px;
  border-radius: 4px;
  border: 1px 0px 0px 0px;
  background-color: #000;
  color: white;
  font-size: 16px;
  font-weight: 400;
}
</style>
  