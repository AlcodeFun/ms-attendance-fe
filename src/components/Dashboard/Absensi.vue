<template>
  <div class="main">
    <h1>Employee Recap</h1>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="" style="color: #cb7de2">Home</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Employee</li>
      </ol>
    </nav>

    <hr />

    <div class="employee-list">
      <div class="employee-filter d-flex">
        <div class="filter-item d-flex" style="gap: 40px">
          <div class="full-name">
            <p>Full Name/ID</p>
            <v-text-field
              outlined
              type="text"
              class="form-input"
              clearable
              dense
              placeholder="Full Name"
            ></v-text-field>
          </div>

          <div class="from-date">
            <p>From Date</p>
            <v-text-field
              outlined
              type="date"
              class="form-input"
              clearable
              dense
              placeholder="From Date"
            ></v-text-field>
          </div>

          <div class="to-date">
            <p>To Date</p>
            <v-text-field
              outlined
              type="date"
              class="form-input"
              clearable
              dense
              placeholder="To Date"
            ></v-text-field>
          </div>
        </div>

        <button style="width: 79px; height: 38px" class="btn btn-success">
          Submit
        </button>
      </div>

      <!-- Loop through employees array to dynamically create employee cards -->
      <div
        v-for="employee in employees"
        :key="employee.id"
        class="employee-card"
      >
        <v-row>
          <v-col class="d-flex justify-center align-items-center">
            <img src="@/assets/employee.png" alt="Employee Image" />
          </v-col>
          <v-col>
            <p>Absent Date</p>
            <h6>{{ employee.absentDate }}</h6>
            <p>Type</p>
            <h6>
              <span :class="typeClass(employee.type)">
                {{ employee.type }}
              </span>
            </h6>
            <p>Timing</p>
            <h6>{{ employee.timing }}</h6>
            <p>Location</p>
            <h6>
              <span style="color: #62bbe6">{{ employee.location }}</span>
            </h6>
          </v-col>
          <v-col>
            <p>Full Name</p>
            <h6>{{ employee.fullName }}</h6>
            <p>ID</p>
            <h6>{{ employee.id }}</h6>
            <p>Position</p>
            <h6>{{ employee.position }}</h6>
            <p>E-Mail</p>
            <h6>{{ employee.email }}</h6>
          </v-col>

          <v-col class="d-flex justify-end align-items-center">
            <v-icon
              @click.native="$router.push('detail/employee-id')"
              style="font-size: 80px; cursor: pointer"
              >mdi-chevron-right</v-icon
            >
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import UsersIcon from "@/components/Icon/Users.vue";
import SortIcon from "@/components/Icon/Sort.vue";

export default {
  name: "Absensi",
  components: { UsersIcon, SortIcon },
  data: () => ({
    // Dummy data simulating an API response
    employees: [
      {
        id: "8213739219",
        fullName: "Jake Sim",
        position: "Data Analyst",
        email: "jakepcrcia@gmail.com",
        absentDate: "3 May 2024",
        type: "OUT",
        timing: "10:40:35",
        location: "View Location",
        image: "@/assets/employee.png",
      },
      {
        id: "9876543210",
        fullName: "Mia Lee",
        position: "Software Engineer",
        email: "mia.lee@example.com",
        absentDate: "2 May 2024",
        type: "IN",
        timing: "09:15:20",
        location: "View Location",
        image: "@/assets/employee.png",
      },
      {
        id: "1234567890",
        fullName: "John Doe",
        position: "Product Manager",
        email: "john.doe@example.com",
        absentDate: "1 May 2024",
        type: "OUT",
        timing: "11:30:45",
        location: "View Location",
        image: "@/assets/employee.png",
      },
    ],
  }),
  methods: {
    typeClass(type) {
      return type === "IN" ? "badge-green" : "badge-red";
    },
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

.employee-list {
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
</style>
