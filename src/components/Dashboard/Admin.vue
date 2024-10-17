<template>
  <div class="main">
    <h1>Admin</h1>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Admin</li>
      </ol>
    </nav>

    <hr />
    <div class="employee-filter d-flex">
      <div class="filter-item d-flex" style="gap: 10px">
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
        Search
      </button>
    </div>
    <div class="employee-list">
      <div class="button-control d-flex justify-content-end" style="gap: 20px">
        <button class="btn btn-success">+ Add HKA</button>
        <button class="btn btn-success">+ Add Hari Libur</button>
      </div>

      <table class="table table-striped table-employee mt-5">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Tahun</th>
            <th scope="col">Bulan</th>
            <th scope="col">HKA</th>
            <th scope="col">Jumlah Hari Libur</th>
            <th scope="col">Tanggal Hari Libur</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2024</td>
            <td>September</td>
            <td>18 Hari</td>
            <td>3 Hari</td>
            <td>3, 10, 13</td>
          </tr>

          <tr>
            <td>2</td>
            <td>2024</td>
            <td>September</td>
            <td>18 Hari</td>
            <td>3 Hari</td>
            <td>3, 10, 13</td>
          </tr>

          <tr>
            <td>3</td>
            <td>2024</td>
            <td>September</td>
            <td>18 Hari</td>
            <td>3 Hari</td>
            <td>3, 10, 13</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  <script>
import UsersIcon from "@/components/Icon/Users.vue";
import SortIcon from "@/components/Icon/Sort.vue";

export default {
  name: "Admin",
  components: { UsersIcon, SortIcon },
  data: () => ({}),
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
  border-radius: 0px 0px 12px 12px;
  margin-top: -1px;
  box-shadow: 0px 4px 4px 0px #00000040;
}

.employee-filter {
  width: 100%;
  position: relative;
  justify-content: start;
  align-items: center;
  gap: 50px;
  background-color: white;
  border-radius: 20px 20px 0px 0px;
  box-shadow: 0px 1px 4px 0px #00000040;
  padding: 30px;
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

::v-deep fieldset {
  background-color: #f9fafb !important;
}

.table-employee > tbody > tr:nth-child(2n + 1) > td,
.table-employee > tbody > tr:nth-child(2n + 1) > th {
  background-color: #f3d2fb;
}
</style>
  