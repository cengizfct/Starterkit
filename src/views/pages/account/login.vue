<template>
  <div>
    <div>
      <div class="container-fluid p-0">
        <div class="row no-gutters">
          <div class="col-lg-4">
            <div
              class="authentication-page-content p-4 d-flex align-items-center min-vh-100"
            >
              <div class="w-100">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <div>
                      <div class="text-center">
                        <div>
                          <a href="/">
                            <img
                              src="../../../assets/images/heocademylogosm.png"
                              height="50"
                              alt="logo"
                            />
                          </a>
                        </div>

                        <h2 class=" mt-3">
                          <span style="color:#FF5740">Heo</span
                          ><span>cademy</span>
                        </h2>
                        <p class="text-muted">Sign in to continue .</p>
                      </div>

                      <b-alert
                        variant="danger"
                        class="mt-3"
                        v-if="notification.message"
                        show
                        dismissible
                        >{{ notification.message }}</b-alert
                      >

                      <div class="p-2 ">
                        <form class="form-horizontal" @submit.prevent="toLogin">
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-mail-line auti-custom-input-icon"></i>
                            <label for="email">Email</label>
                            <input
                              type="email"
                              v-model="email"
                              class="form-control"
                              id="email"
                              placeholder="Enter email"
                              :class="{
                                'is-invalid': submitted && $v.email.$error,
                              }"
                            />
                            <div
                              v-if="submitted && $v.email.$error"
                              class="invalid-feedback"
                            >
                              <span v-if="!$v.email.required"
                                >Email is required.</span
                              >
                              <span v-if="!$v.email.email"
                                >Please enter valid email.</span
                              >
                            </div>
                          </div>

                          <div class="form-group auth-form-group-custom mb-4">
                            <i
                              class="ri-lock-2-line auti-custom-input-icon"
                            ></i>
                            <label for="userpassword">Password</label>
                            <input
                              v-model="password"
                              type="password"
                              class="form-control"
                              id="userpassword"
                              placeholder="Enter password"
                              :class="{
                                'is-invalid': submitted && $v.password.$error,
                              }"
                            />
                            <div
                              v-if="submitted && !$v.password.required"
                              class="invalid-feedback"
                            >
                              Password is required.
                            </div>
                          </div>
                          <div v-if="showLoginFailed">
                            <p class="text-danger h6">
                              <i
                                class="fas fa-exclamation-triangle text-danger mr-2 h5"
                              >
                              </i>
                              Incorrect e-mail or password.
                            </p>
                          </div>

                          <div class="mt-4 text-center">
                            <button
                              class="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >
                              Log In
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="authentication-bg">
              <div class="bg-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { REQUEST_TO_LOGIN } from "../../../services/Requests/Admins";
import {
  authMethods,
  authFackMethods,
  notificationMethods,
} from "@/state/helpers";

export default {
  data() {
    return {
      email: "admin@gmail.com",
      password: "123456",
      submitted: false,
      showLoginFailed: false,
    };
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
  },
  created() {
    document.body.classList.add("auth-body-bg");
  },
  validations: {
    email: { required, email },
    password: { required },
  },
  methods: {
    async toLogin() {
      this.submitted = true;
      this.showLoginFailed = false;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const response = await REQUEST_TO_LOGIN({
        email: this.email,
        password: this.password,
      });
      console.log(response);
      if (response.message === "OK") {
        this.$store.commit("auth/SET_CURRENT_USER", response.data);
        this.$router.push("/");
      } else this.showLoginFailed = true;
    },
    ...authMethods,
    ...authFackMethods,
    ...notificationMethods,
  },
};
</script>
