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

    <div class="filter mt-4 d-flex justify-space-between align-items-center">
      <div class="select-month">
        <p>Month</p>
        <v-text-field
          outlined
          type="month"
          class="form-input"
          clearable
          dense
        ></v-text-field>
      </div>

      <div class="btn-search">
        <button class="btn btn-success">Search</button>
      </div>
    </div>

    <div class="summary mt-4">
      <v-row>
        <v-col lg="7">
          <v-row>
            <v-col lg="4">
              <div class="sum-card d-flex">
                <div class="sum-desc">
                  <h4>Total Entry</h4>
                  <h1 class="text-center">30</h1>
                </div>

                <UsersIcon style="margin-left: auto; margin-top: 0" />
              </div>
            </v-col>
            <v-col lg="4">
              <div class="sum-card d-flex">
                <div class="sum-desc">
                  <h4>Total Entry</h4>
                  <h1 class="text-center">30</h1>
                </div>

                <UsersIcon style="margin-left: auto; margin-top: 0" />
              </div>
            </v-col>

            <v-col lg="4">
              <div class="sum-card d-flex">
                <div class="sum-desc">
                  <h4>Total Entry</h4>
                  <h1 class="text-center">30</h1>
                </div>

                <UsersIcon style="margin-left: auto; margin-top: 0" />
              </div>
            </v-col>
            <v-col lg="4">
              <div class="sum-card d-flex">
                <div class="sum-desc">
                  <h4>Total Entry</h4>
                  <h1 class="text-center">30</h1>
                </div>

                <UsersIcon style="margin-left: auto; margin-top: 0" />
              </div>
            </v-col>
            <v-col lg="4">
              <div class="sum-card d-flex">
                <div class="sum-desc">
                  <h4>Total Entry</h4>
                  <h1 class="text-center">30</h1>
                </div>

                <UsersIcon style="margin-left: auto; margin-top: 0" />
              </div>
            </v-col>
            <v-col lg="4">
              <div class="sum-card d-flex">
                <div class="sum-desc">
                  <h4>Total Entry</h4>
                  <h1 class="text-center">30</h1>
                </div>

                <UsersIcon style="margin-left: auto; margin-top: 0" />
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <div class="salary-list">
            <div
              class="salary-title d-flex align-items-center justify-space-between"
            >
              <h3>Salary List</h3>
              <div class="more-details">
                <a style="color: #b764d1" href="">More Details</a>
                <v-icon>mdi-chevron-right</v-icon>
              </div>
            </div>

            <table class="table table-striped table-salary">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Name</th>
                  <th scope="col">Gaji</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><img src="@/assets/avatar.png" alt="" /></th>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <th scope="row"><img src="@/assets/avatar.png" alt="" /></th>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <th scope="row"><img src="@/assets/avatar.png" alt="" /></th>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-col>
      </v-row>

      <div class="employee-table">
        <div class="employee-table-title d-flex justify-content-between mt-4">
          <h1>Employee</h1>
          <div class="sort-employee">
            <button class="btn-sort" type="button">
              Filter & Sort
              <SortIcon />
            </button>
          </div>
        </div>

        <div class="table-content mt-6">
          <table class="table table-striped table-employee">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">HKE</th>
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
                    @click.native="$router.push('employee/employee-id')"
                    >mdi-play</v-icon
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersIcon from "@/components/Icon/Users.vue";
import SortIcon from "@/components/Icon/Sort.vue";
export default {
  name: "Dashboard",
  components: { UsersIcon, SortIcon },
  data: () => ({
    items: [
      {
        title: "Dashboard",
        disabled: false,
        href: "breadcrumbs_dashboard",
      },
      {
        title: "Link 1",
        disabled: false,
        href: "breadcrumbs_link_1",
      },
      {
        title: "Link 2",
        disabled: true,
        href: "breadcrumbs_link_2",
      },
    ],
  }),
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

.filter {
  padding: 18px 20px 18px 20px;
  background-color: white;
  width: 100%;
}

.sum-card {
  background-color: white;
  border-radius: 20px;
  padding: 16px;
  width: 180px;
  gap: 10px;
}

.sum-card h4 {
  font-size: 16px;
  font-weight: 600;
}

.sum-card h1 {
  font-size: 48px;
  font-weight: 800;
}

.salary-list {
  background-color: white;
  border-radius: 20px;
  height: 100%;
  padding: 20px;
}

.salary-list h3 {
  font-size: 24px;
  font-weight: 800;
}

.salary-list a {
  font-size: 12px;
  font-weight: 700;
}

.table-salary > tbody > tr:nth-child(2n + 1) > td,
.table-salary > tbody > tr:nth-child(2n + 1) > th {
  background-color: #f3d2fb;
}

.table-salary > tbody > tr:nth-child(2n + 1) > th {
  border-radius: 12px 0px 0px 12px;
}

.table-salary > tbody > tr:nth-child(2n + 1) > td:nth-child(3) {
  border-radius: 0px 12px 12px 0px;
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
}

.table-employee > tbody > tr:nth-child(2n + 1) > th {
  border-radius: 12px 0px 0px 12px;
}

.table-employee > tbody > tr:nth-child(2n + 1) > td:nth-child(6) {
  border-radius: 0px 12px 12px 0px;
}

.btn-sort {
  background-color: #a14fbc;
  border-radius: 24px;
  padding: 8px 20px 8px 20px;
  color: white;
}
</style>