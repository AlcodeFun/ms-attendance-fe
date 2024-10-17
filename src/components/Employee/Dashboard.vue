<template>
  <div class="main">
    <h1>Home Dashboard</h1>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#" style="color: #cb7de2">Home</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page"></li>
      </ol>
    </nav>
    <hr />

    <div class="time-date">
      <v-row>
        <v-col col="12" lg="7">
          <div class="current-date">
            <h1>Date</h1>
            <p>{{ currentDate }}</p>
          </div>
        </v-col>
        <v-col style="display: flex; gap: 15px" col="12" lg="5">
          <div class="HKA">
            <div class="hka-amount d-flex flex-column">
              <h4 style="font-size: 14px">
                HKA |
                <span style="font-weight: 600; color: #9747fe">{{
                  currentMonth
                }}</span>
              </h4>
              <div
                class="hka-amount d-flex align-items-center"
                style="gap: 10px"
              >
                <img src="@/assets/kalender.png" height="40" alt="" />
                <h1 style="font-size: 48px; font-weight: 800">
                  {{ hkaAmount }}
                </h1>
              </div>
            </div>
          </div>

          <div class="HKE">
            <div class="hka-amount d-flex flex-column">
              <h4 style="font-size: 14px">
                HKE |
                <span style="font-weight: 600; color: #9747fe"> Today </span>
              </h4>
              <div
                class="hka-amount d-flex align-items-center"
                style="gap: 10px"
              >
                <img src="@/assets/kalender.png" height="40" alt="" />
                <h1 style="font-size: 48px; font-weight: 800">
                  {{ hkeAmount }}
                </h1>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <div class="current-time">
        <span class="time-hour">{{ timeHour }}</span>
        <span class="time-colon">:</span>
        <span class="time-minute">{{ timeMinute }}</span>
        <span class="time-period">{{ timePeriod }}</span>
      </div>
    </div>

    <div class="title">
      <h1>Absensi</h1>
    </div>

    <div
      class="tap-in d-flex justify-content-between"
      @click="$router.push('/employee/tap/IN')"
    >
      <div class="left-section d-flex align-items-center">
        <img src="@/assets/tap-in.png" alt="" height="80" />
        <div class="description">
          <p>Absent Date</p>
          <p style="font-size: 16px; font-weight: 600">{{ currentDate }}</p>
          <!-- Display current date -->
          <p>Type</p>
          <h6 class="mt-2 mb-1"><span class="badge-green">IN</span></h6>

          <p>Timing</p>
          <p>{{ tapinTime }}</p>
          <!-- Display tap-in time -->
        </div>
      </div>

      <div class="right-section d-flex flex-column align-items-center">
        <img src="@/assets/double-tap-in.png" alt="" />
        <h6 style="font-size: 16px; font-weight: 600">TAP IN</h6>
      </div>
    </div>

    <div
      class="tap-out d-flex justify-content-between"
      @click="$router.push('/employee/tap/OUT')"
    >
      <div class="left-section d-flex align-items-center">
        <img src="@/assets/tap-out.png" alt="" height="80" />
        <div class="description">
          <p>Absent Date</p>
          <p style="font-size: 16px; font-weight: 600">{{ currentDate }}</p>
          <!-- Display current date -->
          <p>Type</p>
          <h6 class="mt-2 mb-1"><span class="badge-red">OUT</span></h6>
          <p>Timing</p>
          <p>{{ tapoutTime }}</p>
          <!-- Display tap-out time -->
        </div>
      </div>

      <div class="right-section d-flex flex-column align-items-center">
        <img src="@/assets/double-tap-out.png" alt="" />
        <h6 style="font-size: 16px; font-weight: 600">TAP OUT</h6>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DashboardEmployee",
  data() {
    return {
      currentMonth: "",
      currentDate: "",
      timeHour: "",
      timeMinute: "",
      timePeriod: "",
      hkaAmount: 0,
      hkeAmount: 0,
      tapinTime: "-", // Initialize with a placeholder
      tapoutTime: "-", // Initialize with a placeholder
    };
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      const optionsMonth = { month: "long" };
      this.currentMonth = now.toLocaleString("en-US", optionsMonth);

      const optionsDate = { year: "numeric", month: "short", day: "numeric" };
      this.currentDate = now.toLocaleDateString("en-US", optionsDate);

      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const period = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12;

      this.timeHour = hours.toString().padStart(2, "0");
      this.timeMinute = minutes;
      this.timePeriod = period;
    },
    async getStatistics() {
      try {
        const response = await axios.get("/statistics");
        this.hkaAmount = response.data.HKA;
        this.hkeAmount = response.data.HKE;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Session expired, redirect to login page
          this.$store.dispatch("logout", this.$router);
        } else {
          console.error("Error fetching data:", error);
        }
      }
    },
    getAbsenTimes() {
      const absenData = JSON.parse(localStorage.getItem("absenData"));

      if (absenData) {
        const now = new Date().getTime();
        const expiresAt = absenData.expiresAt;

        if (now >= expiresAt) {
          // If current time is past expiration, clear localStorage
          localStorage.removeItem("absenData");
          this.tapinTime = "-";
          this.tapoutTime = "-";
        } else {
          // Otherwise, display the stored tap-in and tap-out times
          this.tapinTime = absenData.tapin
            ? new Date(absenData.tapin).toLocaleTimeString()
            : "-";
          this.tapoutTime = absenData.tapout
            ? new Date(absenData.tapout).toLocaleTimeString()
            : "-";
        }
      }
    },
  },
  mounted() {
    this.updateDateTime();
    this.getStatistics();
    this.getAbsenTimes();
    setInterval(() => {
      this.updateDateTime();
    }, 1000); // 1-second interval
  },
};
</script>
  
  <style scoped>
.breadcrumb {
  background: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
  font-size: 12px;
  font-weight: 400;
}

nav {
  padding: 0 !important;
}
.main {
  margin: 10px;
}

.time-date {
  background-color: #fae9ef;
  padding: 32px;
  border-radius: 20px;
  width: 100%;
  height: auto;
}

.current-date {
  border-radius: 6px;
  padding: 16px;
  background-color: #fff;
  border: 1px solid #c6c6c6;
  margin-bottom: 24px;
}

.current-date h1 {
  font-size: 32px;
  font-weight: 400;
  margin: 0;
  color: #562266;
}

.current-date p {
  color: #702e86;
  font-size: 24px;
  font-weight: 400;
  margin: 0;
}

.current-time {
  display: flex;
  align-items: center;
  font-size: 42px;
  font-weight: 400;
  color: #5f3a7e;
}

.time-hour,
.time-minute {
  background-color: #f5f7fa;
  padding: 12px 32px 12px 32px;
  border-radius: 12px;
  border: 3px solid #e5e7f0;
  margin-right: 8px;
}

.time-colon {
  font-size: 42px;
  color: black;
  margin-right: 8px;
}

.time-period {
  font-size: 42px;
  color: #5f3a7e;
  margin-left: 8px;
}

.HKA {
  background-color: #fff;
  border-radius: 16px;
  padding: 10px;
  width: fit-content;
  height: fit-content;
}

.HKE {
  background-color: #fff;
  border-radius: 16px;
  padding: 10px;
  width: fit-content;
  height: fit-content;
}

.title {
  background: #f3d2fb;
  box-shadow: 0px 4px 4px 0px #00000040 inset;
  border-radius: 10px;
  margin-top: 24px;
}

.title h1 {
  font-size: 24px;
  padding: 32px 16px 32px 16px;
  font-weight: 600;
}

.tap-in {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 16px;
  margin-top: 24px;
  box-shadow: 0px 4px 4px 0px #00000040;
  cursor: pointer;
}

.tap-in p {
  font-size: 12px;
  font-weight: 500;
  margin: 0;
}

.right-section {
  background-color: #f3f3f3;
  padding: 13px 25px 15px 25px;
  border-radius: 200px;
}

.tap-in .right-section:hover {
  background-color: #dfffed;
  transition: ease-in-out;
}

.tap-out .right-section:hover {
  background-color: #c3efff;
  transition: ease-in-out;
}

.tap-out {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 16px;
  margin-top: 24px;
  box-shadow: 0px 4px 4px 0px #00000040;
  cursor: pointer;
}

.tap-out p {
  font-size: 12px;
  font-weight: 500;
  margin: 0;
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
  padding: 5px 5px;
  border-radius: 5px;
}
</style>
  