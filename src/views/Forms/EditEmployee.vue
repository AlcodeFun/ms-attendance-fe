<template>
  <div class="main">
    <h1>Management User</h1>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="/manage-user/home" style="color: #cb7de2">Home</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Edit Employee
        </li>
      </ol>
    </nav>

    <hr />

    <div class="form-container">
      <h1>Edit Employee</h1>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="inputFullName">Full Name</label>
          <input
            type="text"
            class="form-control"
            id="inputFullName"
            placeholder="Enter Full Name"
            v-model="fullName"
          />
        </div>

        <div class="form-group">
          <label for="inputUserName">Username</label>
          <input
            type="text"
            class="form-control"
            id="inputUserName"
            placeholder="Enter Username"
            v-model="userName"
          />
        </div>

        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            placeholder="Enter E-Mail"
            v-model="email"
          />
        </div>

        <div class="form-group">
          <label for="inputPhoto">Employee Photo</label>
          <!-- Image Preview -->
          <div
            v-if="file || imagePreview"
            class="image-preview d-flex justify-content-between mb-5"
            style="border: 1px solid #ced4da; border-radius: 2px"
          >
            <div class="img-file d-flex align-items-center" style="gap: 20px">
              <img :src="imagePreview || file" alt="Image Preview" />
              <p>{{ fileName || "Existing Image" }}</p>
            </div>

            <v-icon style="color: red; margin-right: 15px" @click="removeImage"
              >mdi-delete-outline</v-icon
            >
          </div>
          <div
            class="file-drop-area"
            @drop.prevent="handleFileDrop"
            @dragover.prevent
          >
            <!-- Hidden file input -->
            <input
              type="file"
              class="file-input"
              id="inputPhoto"
              accept="image/jpeg, image/png, image/gif"
              @change="handleFileUpload"
              ref="fileInput"
              style="display: none"
            />
            <div class="placeholder-text">
              <UploadIcon width="33" />
              <span
                >Drag & drop an image or <br />
                <a href="#" @click.prevent="triggerFileInput">browse</a> to
                choose a file</span
              >
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="selectPosition">Position</label>
          <select class="form-control" id="selectPosition" v-model="position">
            <option>--Select Position--</option>
            <option>UI/UX Designer</option>
            <option>Frontend Developer</option>
            <!-- You can populate positions dynamically -->
          </select>
        </div>

        <div class="form-group">
          <label for="selectRole">Role</label>
          <select class="form-control" id="selectRole" v-model="role">
            <option>--Select Role--</option>
            <option>Admin</option>
            <option>Employee</option>
          </select>
        </div>

        <div class="form-group">
          <label for="inputPhoneNumber">Number Handphone</label>
          <input
            type="text"
            class="form-control"
            id="inputPhoneNumber"
            placeholder="Enter Number Handphone"
            v-model="phoneNumber"
          />
        </div>

        <div class="button-submit d-flex justify-content-center">
          <button style="margin: auto" type="submit" class="btn btn-success">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script>
import UploadIcon from "@/components/Icon/Upload.vue";

export default {
  name: "EditEmployeeView",
  components: { UploadIcon },
  data() {
    return {
      // Assume these are pre-filled from API call
      fullName: "",
      userName: "",
      email: "",
      file: null, // New file
      fileName: "", // File name if uploading a new image
      imagePreview: "", // Existing image URL from database
      position: "",
      role: "",
      phoneNumber: "",
      employeeId: null, // Unique identifier for the employee
    };
  },
  mounted() {
    // Fetch the existing employee data here (e.g., using the ID from route params)
    this.loadEmployeeData();
  },
  methods: {
    loadEmployeeData() {
      // Example: Fetch employee data by ID (employeeId)
      // For now, assume we get a response with employee details
      const employeeData = {
        fullName: "John Doe",
        userName: "johndoe",
        email: "johndoe@example.com",
        phoneNumber: "123456789",
        position: "Frontend Developer",
        role: "Employee",
        imagePreview: "https://path/to/existing/image.jpg", // Example image
      };
      this.fullName = employeeData.fullName;
      this.userName = employeeData.userName;
      this.email = employeeData.email;
      this.phoneNumber = employeeData.phoneNumber;
      this.position = employeeData.position;
      this.role = employeeData.role;
      this.imagePreview = employeeData.imagePreview;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && this.validateFile(file)) {
        this.file = file;
        this.fileName = file.name;
        this.previewImage(file);
      }
    },
    handleFileDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file && this.validateFile(file)) {
        this.file = file;
        this.fileName = file.name;
        this.previewImage(file);
      }
    },
    validateFile(file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        alert(
          "Invalid file type. Please select an image file (jpg, png, gif)."
        );
        return false;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB.");
        return false;
      }
      return true;
    },
    previewImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    removeImage() {
      this.file = null;
      this.fileName = "";
      this.imagePreview = ""; // Reset the preview
    },
    submitForm() {
      if (!this.file && !this.imagePreview) {
        alert("Please upload an image file.");
        return;
      }

      const payload = {
        fullName: this.fullName,
        userName: this.userName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        position: this.position,
        role: this.role,
        file: this.file, // If updating the image
      };

      // Update employee data (API call here)
      console.log("Updating employee with payload:", payload);
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

.file-drop-area {
  border: 2px dashed #cb7de2;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  position: relative;
}

.file-drop-area:hover {
  background-color: #f9fafb;
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

.image-preview {
  margin-top: 15px;
}

.image-preview img {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
    