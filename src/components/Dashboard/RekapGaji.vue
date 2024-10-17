<template>
  <div class="main">
    <h1>Rekap Gaji</h1>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="/manage-user/home" style="color: #cb7de2">Home</a>
        </li>
      </ol>
    </nav>

    <hr />

    <div class="employee-table employee-list">
      <div class="employee-table-title d-flex justify-content-between mt-4">
        <h1 style="padding-right: 100px">Salary List</h1>

        <v-text-field
          style="border-radius: 30px; width: 300px !important"
          outlined
          type="search"
          class="form-input"
          clearable
          dense
          placeholder="Search"
          append-icon="mdi-magnify"
        >
          ></v-text-field
        >
        <div class="sort-employee" style="padding-left: 100px">
          <button
            class="btn-add"
            type="button"
            @click="$router.push('add-gaji')"
          >
            Add Salary
            <v-icon style="color: white">mdi-plus</v-icon>
          </button>
        </div>
      </div>

      <div class="table-content mt-6">
        <table class="table table-striped table-employee">
          <thead>
            <tr>
              <th scope="col">Position</th>
              <th scope="col">Gaji</th>
              <th scope="col">Uang Makan</th>
              <th scope="col">Uang Transport</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">UI/UX Designer</th>
              <td>8.000.000</td>
              <td>200.000</td>
              <td>100.000</td>
              <td>
                <v-icon
                  style="cursor: pointer; color: black"
                  @click.native="$router.push('edit-gaji/id')"
                  >mdi-pencil</v-icon
                >
              </td>
            </tr>
          </tbody>
        </table>

        <h1 style="padding-right: 100px; margin-top: 50px">
          Employee Salary List
        </h1>

        <table class="table table-striped table-employee">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Gaji</th>
              <th scope="col">E-Mail</th>
              <th scope="col">Position</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"><img src="@/assets/avatar.png" alt="" /></th>
              <td>Mark</td>
              <td>Otto</td>
              <td>25</td>
              <td>UI/UX Designer</td>
              <td>
                <v-icon
                  style="cursor: pointer"
                  @click.native="$router.push('detail/salary-id')"
                  >mdi-play</v-icon
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
      
      <script>
import UsersIcon from "@/components/Icon/Users.vue";
import SortIcon from "@/components/Icon/Sort.vue";

export default {
  name: "RekapGaji",
  components: { UsersIcon, SortIcon },
  data: () => ({
    // Dummy data simulating an API response
    employees: [
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

::v-deep.v-text-field {
  width: 400px !important;
}

.employee-table {
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

.table-employee > tbody > tr:nth-child(2n + 1) > td:nth-child(6) {
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
  width: 100px !important;
}
</style>
      