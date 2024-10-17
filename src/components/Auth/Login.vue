<template>
  <div class="main">
    <div class="hero-img" style="z-index: 1">
      <img
        style="margin-bottom: -5px"
        src="../../../public/team-ms.png"
        width="600"
        alt=""
      />
    </div>
    <div class="auth-content" style="z-index: 99">
      <div class="company-logo d-flex justify-content-center">
        <img width="150" src="@/assets/logo.svg" alt="" />
      </div>
      <div v-if="isLogin" class="login-container">
        <div class="login-form d-flex flex-column align-items-center">
          <h1 class="mb-5 text-center">Silahkan Masuk!</h1>
          <img
            class="mb-4 d-flex justify-content-center"
            width="200"
            src="@/assets/loginvector.svg"
            alt=""
          />
          <h6 class="mb-3">
            Hai, Selamat Datang di Website Absensi Max Samasta!
          </h6>
          <p>
            Senang banget kamu di sini! Yuk, cek absensi dan jadwal kerja kamu
            dengan mudah. Terima kasih sudah jadi bagian dari tim kami!
          </p>
          <v-form>
            <v-text-field
              style="border-radius: 10px"
              v-model="emailOrUsername"
              :rules="emailOrUsernameRules"
              filled
              label="E-mail/Username"
              required
              class="custom-text-field"
              placeholder="E-Mail/Username"
            ></v-text-field>

            <v-text-field
              style="border-radius: 10px; width: 100%"
              v-model="password"
              :rules="passwordRules"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              filled
              label="Password"
              hint="At least 6 characters"
              class="input-group--focused"
              @click:append="showPassword = !showPassword"
              placeholder="Password"
            ></v-text-field>
            <div class="d-flex flex-column">
              <a
                @click="forgotPassword"
                href="#"
                style="
                  text-decoration: none;
                  color: #fff;
                  text-align: right;
                  font-weight: 600;
                "
                >Forgot Password?</a
              >
              <v-btn
                style="
                  background-color: #562266;
                  box-shadow: none !important;
                  color: white;
                  border-radius: 15px;
                  width: 50%;
                  margin: auto;
                  height: 45px;
                  margin-top: 30px;
                "
                @click="login"
                >Login</v-btn
              >
            </div>
          </v-form>
        </div>
      </div>
      <div v-if="isForgot" class="forgot-container">
        <h1 class="mb-5 text-center">Forgot Password</h1>
        <img
          class="mb-3"
          width="200"
          src="@/assets/loginvector.svg"
          alt=""
          style="
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 50%;
          "
        />
        <p style="display: flex; justify-content: start">
          Masukkan E-Mail atau Username untuk reset.
        </p>
        <v-form>
          <v-text-field
            style="border-radius: 10px"
            v-model="emailOrUsername"
            :rules="emailOrUsernameRules"
            filled
            label="E-mail/Username"
            required
            class="custom-text-field"
            placeholder="E-Mail/Username"
          ></v-text-field>
          <v-btn
            style="
              background-color: #562266;
              box-shadow: none !important;
              color: white;
              border-radius: 15px;
              height: 45px;
              display: block;
              margin-left: auto;
              margin-right: auto;
              width: 50%;
              align-items: center;
              margin-top: 30px;
            "
            @click="submitForgotPassword"
            >Submit</v-btn
          >
        </v-form>
      </div>

      <div v-if="!isPWCorrect" class="forgot-container">
        <h1 class="mb-5 text-center">
          Password Incorrect / <br />
          Form Not Completed
        </h1>
        <img
          class="mb-3"
          width="200"
          src="@/assets/loginvector.svg"
          alt=""
          style="
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 50%;
          "
        />
        <p style="display: flex; justify-content: center">
          Masukkan E-Mail atau Username untuk reset.
        </p>
        <div class="d-flex justify-content-cener w-100">
          <v-btn
            style="
              background-color: #562266;
              box-shadow: none !important;
              color: white;
              border-radius: 15px;
              width: 50%;
              margin: auto;
              height: 45px;
              margin-top: 30px;
            "
            @click="backToLogin"
            >Login</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import VueSweetalert2 from "vue-sweetalert2"; // Import SweetAlert2
import "sweetalert2/dist/sweetalert2.min.css"; // Import SweetAlert2 CSS

export default {
  name: "Login",
  data() {
    return {
      isForgot: false,
      isLogin: true,
      isPWCorrect: true,
      emailOrUsername: "",
      emailOrUsernameRules: [
        (v) => !!v || "E-mail or Username is required",
        (v) =>
          /.+@.+\..+/.test(v) ||
          /^[a-zA-Z0-9_]+$/.test(v) ||
          "Must be a valid e-mail or username",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password must be at least 6 characters",
      ],
      showPassword: false,
      errorMsg: "",
    };
  },
  methods: {
    ...mapActions({
      performLogin: "login", // Maps Vuex login action
    }),

    async login() {
      try {
        const credentials = {
          email: this.emailOrUsername,
          password: this.password,
        };

        const userData = await this.performLogin(credentials); // Call the mapped action

        // Handle redirection based on user role
        if (userData.role === "admin") {
          this.isPWCorrect = true;
          await this.$router.push({ name: "adminDashboard" });
        } else if (userData.role === "employee") {
          this.isPWCorrect = true;
          await this.$router.push({ name: "employeeDashboard" });
        } else {
          this.errorMsg = "Invalid user role.";
          return;
        }

        // Show success alert after successful login
        this.$swal.fire({
          title: "Login Successful!",
          text: "Welcome to Max Samasta Attendance!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        this.errorMsg = error.message || "Login failed";
        this.isPWCorrect = false;
        this.isLogin = false;
      }
    },

    forgotPassword() {
      this.isForgot = true;
      this.isLogin = false;
    },

    backToLogin() {
      this.isForgot = false;
      this.isLogin = true;
      this.isPWCorrect = true;
    },

    async submitForgotPassword() {
      // Implement the forgot password logic
    },
  },

  mounted() {
    this.isLogin = !this.isForgot;
  },
};
</script>


<style scoped>
.main {
  display: flex;
  align-items: end;
  height: auto;
  min-height: 100vh;
  gap: 40px;
}

.auth-content {
  width: 530px;
  min-height: 90vh;
  height: auto;
  margin-top: 30px;
  border-radius: 25px 25px 0px 0px;
  padding: 50px;
  background-color: #702e86cc;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.auth-content h1 {
  color: #fff;
  font-size: 30px;
}

.auth-content h6 {
  color: #fff;
  font-size: 20px;
  text-align: start;
}

.auth-content p {
  color: #fff;
  font-size: 12px;
  text-align: start;
}

::v-deep .v-text-field {
  width: 450px;
}

::v-deep .v-input__slot::before,
::v-deep .v-input__slot::after {
  border-style: none !important;
}

::v-deep .v-input__slot {
  background-color: none !important;
}

::v-deep .v-input--is-focused .v-input__slot {
  border: 1px solid #562266 !important;
  border-bottom-color: #562266 !important;
}

::v-deep .v-input .v-input__slot {
  border: 1px solid #fff !important;
  border-bottom-color: white !important;
}
</style>
