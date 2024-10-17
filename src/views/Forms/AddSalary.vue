<template>
  <div class="main">
    <h1>Rekap Gaji</h1>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="/rekap-gaji/home" style="color: #cb7de2">Home</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Add Gaji</li>
      </ol>
    </nav>

    <hr />

    <div class="form-container">
      <h1>Add Gaji</h1>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="inputPosition">Position</label>
          <input
            type="text"
            class="form-control"
            id="inputPosition"
            placeholder="Enter Position"
            v-model="position"
          />
        </div>

        <div class="form-group">
          <label for="inputGajiPokok">Gaji Pokok</label>
          <p style="font-size: 12px; font-weight: 500">
            HKE @Gaji Pokok Harian
          </p>
          <input
            type="text"
            class="form-control"
            id="inputGajiPokok"
            placeholder="Enter Gaji Pokok"
            v-model="gajiPokok"
          />
        </div>

        <div class="form-group">
          <label for="inputUangMakan">Uang Makan</label>
          <p style="font-size: 12px; font-weight: 500">
            HKE @Uang Makan Harian
          </p>
          <input
            type="number"
            class="form-control"
            id="inputUangMakan"
            placeholder="Enter Uang Makan"
            v-model="uangMakan"
          />
        </div>

        <div class="form-group">
          <label for="inputUangTransport">Uang Transport</label>
          <p style="font-size: 12px; font-weight: 500">
            HKE @Uang Transport Harian
          </p>
          <input
            type="number"
            class="form-control"
            id="inputUangTransport"
            placeholder="Enter Uang Transport"
            v-model="uangTransport"
          />
        </div>

        <div class="button-submit d-flex justify-content-center">
          <button style="margin: auto" type="submit" class="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
    
    
    
  
    <script>
import UploadIcon from "@/components/Icon/Upload.vue";
export default {
  name: "AddEmployeeView",
  components: { UploadIcon },
  data() {
    return {
      fullName: "",
      userName: "",
      email: "",
      file: null,
      fileName: "",
      imagePreview: "", // for image preview URL
    };
  },
  methods: {
    submitForm() {
      // Handle the form submission logic, e.g., send data to server
      console.log("Full Name:", this.fullName);
      console.log("Username:", this.userName);
      console.log("Email:", this.email);
      console.log("Uploaded file:", this.file);
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

.form-container {
  background-color: white;
  padding: 32px;
  border-radius: 12px;
}

h1 {
  font-size: 32px;
  font-weight: 800;
  color: black;
}

nav {
  padding: 0 !important;
}

.form-control {
  background-color: #f9fafb;
}

label {
  font-weight: 800;
}

.placeholder-text {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.upload-icon {
  width: 24px;
  height: 24px;
}

.placeholder-text a {
  color: #cb7de2;
  text-decoration: underline;
  cursor: pointer;
}
</style>
    