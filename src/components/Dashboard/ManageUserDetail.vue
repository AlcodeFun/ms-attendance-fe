<template>
  <div class="main">
    <h1>Management User</h1>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="/manage-user/home" style="color: #cb7de2">Home</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">User Detail</li>
      </ol>
    </nav>

    <hr />

    <div class="employee-container employee-detail">
      <div class="employee-detail-title d-flex justify-content-between mt-4">
        <h1 style="padding-right: 100px">Profile Employee</h1>
        <div class="action-control d-flex" style="gap: 10px">
          <button
            class="edit-btn"
            @click="$router.push('/manage-user/edit-employee/id')"
          >
            <v-icon>mdi-account-edit</v-icon>
            Edit Employee
          </button>
          <button class="delete-btn">
            <v-icon>mdi-delete-outline</v-icon>
            Hapus Employee
          </button>
          <button class="suspend-btn">
            <v-icon>mdi-close</v-icon>
            Suspend Employee
          </button>
        </div>
      </div>
      <div
        class="employee-data mt-6 d-flex align-items-center flex-column"
        style="gap: 10px"
      >
        <img class="mb-6" width="200" src="@/assets/employee.png" alt="" />
        <table class="table table-striped table-employee">
          <tbody>
            <tr>
              <th scope="row">Full Name</th>
              <td>Lee Hee Seung</td>
            </tr>
            <tr>
              <th scope="row">ID</th>
              <td>040803APH</td>
            </tr>
            <tr>
              <th scope="row">Position</th>
              <td>UI/UX Designer</td>
            </tr>
            <tr>
              <th scope="row">E-Mail</th>
              <td>heeseungpcrmanda@gmail.com</td>
            </tr>
            <tr>
              <th scope="row">Username</th>
              <td>heeseungmnd</td>
            </tr>
            <tr>
              <th scope="row">Number Handphone</th>
              <td>085158443573</td>
            </tr>
            <tr>
              <th scope="row">Gender</th>
              <td>Man</td>
            </tr>
            <tr>
              <th scope="row">PIN</th>
              <td>040803</td>
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
  name: "ManageUserDetail",
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
  width: 100px !important;
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
      