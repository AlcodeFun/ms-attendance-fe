<template>
  <div class="main">
    <h1>TAP {{ type }}</h1>
    <nav aria-label="breadcrumb">
      <notifications group="foo" position="bottom right" width="500" />
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="/employee/dashboard" style="color: #cb7de2">Home</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          TAP {{ type }}
        </li>
      </ol>
    </nav>
    <hr />

    <div class="tap-container">
      <div class="maps-view mb-4">
        <l-map
          style="height: 350px; width: 100%; z-index: 1"
          :zoom="zoom"
          :center="center"
        >
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :lat-lng="markerLatLng" :icon="employeeIcon"></l-marker>
        </l-map>
      </div>
      <div class="update-btn d-flex justify-content-center">
        <button class="btn btn-success mb-5" @click="updateLocation">
          <v-icon style="color: white">mdi-pencil-box-outline</v-icon> Update
          Location
        </button>
      </div>

      <div
        id="app"
        class="web-camera-container"
        style="min-height: 350px; width: 100%; height: auto"
      >
        <div class="camera-button">
          <button
            type="button"
            class="button rounded p-2"
            :class="{
              '': !isCameraOpen,
              'btn-danger': isCameraOpen,
            }"
            @click="toggleCamera"
          >
            <span v-if="!isCameraOpen">
              <v-icon>mdi-camera</v-icon> Click to Open Your Camera</span
            >
            <span v-else>Close Camera</span>
          </button>
        </div>

        <div v-show="isCameraOpen && isLoading" class="camera-loading">
          <ul class="loader-circle">
            <li></li>
            <li></li>
          </ul>
        </div>

        <div
          v-if="isCameraOpen"
          v-show="!isLoading"
          class="camera-box"
          :class="{ flash: isShotPhoto }"
        >
          <div class="camera-shutter" :class="{ flash: isShotPhoto }"></div>

          <video
            v-show="!isPhotoTaken"
            ref="camera"
            :width="450"
            :height="337.5"
            autoplay
          ></video>

          <canvas
            v-show="isPhotoTaken"
            id="photoTaken"
            ref="canvas"
            :width="450"
            :height="337.5"
          ></canvas>
        </div>

        <div
          v-if="isCameraOpen && !isLoading"
          class="camera-shoot d-flex"
          style="gap: 5px"
        >
          <button
            v-if="!isPhotoTaken"
            type="button"
            class="button"
            @click="takePhoto"
            style="background-color: #fff; border-radius: 200px"
          >
            <img
              src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"
            />
          </button>
          <button
            v-if="isPhotoTaken"
            type="button"
            class="button"
            @click="retakePhoto"
          >
            <v-icon
              style="
                color: #000;
                background-color: #fff;
                border-radius: 200px;
                font-size: 40px !important;
                padding: 7px;
              "
              >mdi-replay</v-icon
            >
          </button>
        </div>
      </div>

      <div class="update-btn d-flex justify-content-center">
        <button
          class="btn btn-success mt-5"
          @click="submitData"
          :disabled="isSubmitting"
        >
          <v-icon v-if="!isSubmitting" style="color: white">mdi-check</v-icon>
          <span v-if="!isSubmitting">Submit</span>
          <span v-if="isSubmitting">
            <v-icon
              class="spinner-border"
              role="status"
              aria-hidden="true"
            ></v-icon>
            Submitting...
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "DashboardEmployee",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  data() {
    return {
      type: this.$route.params.type,
      imageBase64: null,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [51.505, -0.159],
      markerLatLng: [51.504, -0.159],
      employeeIcon: null,
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      isSubmitting: false, // New state for submission loading
    };
  },
  mounted() {
    if (this.getUser) {
      this.employeeIcon = L.icon({
        iconUrl: this.getUser.urlprofile || require("@/assets/avatar.png"),
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
    }
    this.updateLocation();
  },
  methods: {
    // static coordinate for debugging
    // updateLocation() {
    //   const lat = -6.577023245193599;
    //   const lng = 106.81070304025452;
    //   this.center = [lat, lng];
    //   this.markerLatLng = [lat, lng];
    // },
    updateLocation() {
      const geoOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            this.center = [lat, lng];
            this.markerLatLng = [lat, lng];
          },
          (error) => {
            console.error("Error getting location: ", error);
            alert("Could not get your current location.");
          },
          geoOptions
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.isShotPhoto = false;
        this.imageBase64 = null;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },
    createCameraElement() {
      this.isLoading = true;

      const constraints = {
        audio: false,
        video: true,
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.isLoading = false;
          this.$refs.camera.srcObject = stream;
        })
        .catch(() => {
          this.isLoading = false;
          alert("Camera access error.");
        });
    },
    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    },
    takePhoto() {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true;
        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto = false;
        }, FLASH_TIMEOUT);
      }

      this.isPhotoTaken = true;
      const context = this.$refs.canvas.getContext("2d");
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
      this.imageBase64 = this.$refs.canvas.toDataURL("image/jpeg");
    },
    retakePhoto() {
      this.isPhotoTaken = false;
      this.imageBase64 = null;
    },
    submitData() {
      if (!this.imageBase64 || !this.markerLatLng.length) {
        this.$notify({
          group: "foo",
          title: "Data not completed",
          text: "Please ensure location and photo taken!",
          type: "warn",
          duration: 3000,
        });
        return;
      }

      this.isSubmitting = true; // Start loading

      const [latitude, longitude] = this.markerLatLng;
      const base64ToBlob = (base64) => {
        const byteString = atob(base64.split(",")[1]);
        const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
        const buffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(buffer);

        for (let i = 0; i < byteString.length; i++) {
          uintArray[i] = byteString.charCodeAt(i);
        }

        return new Blob([buffer], { type: mimeString });
      };

      const photoBlob = base64ToBlob(this.imageBase64);
      const file = new File([photoBlob], "photo.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("photo", file);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

      const endpoint = this.type === "IN" ? "/absen/in" : "/absen/out";

      axios
        .post(endpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Correctly extract the tapin and tapout from the nested data object
          const tapin = response.data.data.tapin || null;
          const tapout = response.data.data.tapout || null;

          // Calculate next day's 00:00 AM for expiration
          const now = new Date();
          const nextMidnight = new Date();
          nextMidnight.setHours(24, 0, 0, 0); // Set to 00:00 AM of the next day

          const absenData = {
            tapin: tapin, // Store the correctly extracted tapin
            tapout: tapout, // Store the correctly extracted tapout
            expiresAt: nextMidnight.getTime(), // Store the expiration time in milliseconds
          };

          // Store the absenData in localStorage
          localStorage.setItem("absenData", JSON.stringify(absenData));

          if (this.type === "IN") {
            this.$notify({
              group: "foo",
              title: "SUCCESS Tapped IN",
              text: "You have tapped IN today!",
              type: "success",
              duration: 3000,
            });
          } else {
            this.$notify({
              group: "foo",
              title: "SUCCESS Tapped OUT",
              text: "You have tapped OUT today!",
              type: "success",
              duration: 3000,
            });
          }

          setTimeout(() => {
            this.$router.push({ name: "employeeDashboard" });
          }, 3000);
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message || "Submission error";

          if (
            error.response?.status === 400 ||
            error.response?.status === 404
          ) {
            if (errorMessage === "You can only tap in once per day") {
              this.$notify({
                group: "foo",
                title: "Already Tapped IN",
                text: "You can only tap in once per day!",
                type: "warn",
                duration: 3000,
              });
            } else if (errorMessage === "You can only tap out once per day") {
              this.$notify({
                group: "foo",
                title: "Already Tapped OUT",
                text: "You can only tap out once per day!",
                type: "warn",
                duration: 3000,
              });
            } else if (
              errorMessage ===
              "Your location is outside the allowed area for attendance"
            ) {
              this.$notify({
                group: "foo",
                title: "You Are not in the office",
                text: "Your location is outside the allowed area for attendance!",
                type: "warn",
                duration: 3000,
              });
            } else if (
              errorMessage === "Tap in record not found or already tapped out"
            ) {
              this.$notify({
                group: "foo",
                title: "You have not tapped IN",
                text: "You can only TAP OUT when already TAP IN",
                type: "danger",
                duration: 3000,
              });
            } else {
              alert("Error: " + errorMessage);
            }
          } else {
            alert("Failed to submit data.");
          }
        })
        .finally(() => {
          // Always close the camera and reset states even if an error occurs
          this.isCameraOpen = false;
          this.isPhotoTaken = false;
          this.isShotPhoto = false;
          this.imageBase64 = null;
          this.stopCameraStream();

          this.isSubmitting = false; // End loading
        });
    },
  },
};
</script>

<style scoped>
/* Styles for the loading spinner */
.spinner-border {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  vertical-align: text-bottom;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner-border 0.75s linear infinite;
}

@keyframes spinner-border {
  100% {
    transform: rotate(360deg);
  }
}

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

.tap-container {
  background-color: white;
  padding: 32px;
  border-radius: 12px;
}

.maps-view {
  z-index: 1 !important;
}

.web-camera-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed #cb7de2;
  border-radius: 4px;
}
.web-camera-container .camera-button {
  margin-bottom: 2rem;
}
.web-camera-container .camera-box .camera-shutter {
  opacity: 0;
  width: 450px;
  height: 337.5px;
  background-color: #cb7de2;
  position: absolute;
}
.web-camera-container .camera-box .camera-shutter.flash {
  opacity: 1;
}
.web-camera-container .camera-shoot {
  margin: 1rem 0;
}
.web-camera-container .camera-shoot button {
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
}
.web-camera-container .camera-shoot button img {
  height: 35px;
  object-fit: cover;
}
.web-camera-container .camera-loading {
  overflow: hidden;
  height: 100%;
  position: absolute;
  width: 100%;
  min-height: 150px;
  margin: 3rem 0 0 -1.2rem;
}
.web-camera-container .camera-loading ul {
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 999999;
  margin: 0;
}
.web-camera-container .camera-loading .loader-circle {
  display: block;
  height: 14px;
  margin: 0 auto;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  position: absolute;
  width: 100%;
  padding: 0;
}
.web-camera-container .camera-loading .loader-circle li {
  display: block;
  float: left;
  width: 10px;
  height: 10px;
  line-height: 10px;
  padding: 0;
  position: relative;
  margin: 0 0 0 4px;
  background: #cb7de2;
  animation: preload 1s infinite;
  top: -50%;
  border-radius: 100%;
}
.web-camera-container .camera-loading .loader-circle li:nth-child(2) {
  animation-delay: 0.2s;
}
.web-camera-container .camera-loading .loader-circle li:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes preload {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
</style>
