<template>
  <div class="main">
    <h1>Management User</h1>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="/manage-user/home" style="color: #cb7de2">Home</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Add Employee</li>
      </ol>
    </nav>

    <hr />

    <div class="form-container">
      <h1>Add Employee</h1>

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
            v-if="file"
            class="image-preview d-flex justify-content-between mb-5"
            style="border: 1px solid #ced4da; border-radius: 2px"
          >
            <div class="img-file d-flex align-items-center" style="gap: 20px">
              <img :src="imagePreview" alt="Image Preview" />
              <p>{{ fileName }}</p>
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
          <select class="form-control" id="selectPosition">
            <option>--Select Position--</option>
            <option>UI/UX Designer</option>
            <option>Frontend Developer</option>
          </select>
        </div>

        <div class="form-group">
          <label for="selectRole">Role</label>
          <select class="form-control" id="selectRole">
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
        // limit file size to 2MB
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
      this.$refs.fileInput.click(); // Trigger click on hidden file input
    },
    removeImage() {
      this.file = null;
      this.fileName = "";
      this.imagePreview = "";
    },
    submitForm() {
      if (!this.file) {
        alert("Please upload an image file.");
        return;
      }
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
  