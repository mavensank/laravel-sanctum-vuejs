<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card>
          <v-card-title>
            <span class="text-h5">Register</span>
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field v-model="name" label="Name" required></v-text-field>

              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>

              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                required
              ></v-text-field>

              <v-btn
                type="submit"
                color="primary"
                class="mt-4"
                :loading="loading"
              >
                Register
              </v-btn>
            </v-form>

            <v-alert v-if="error" type="error" dismissible class="mt-3">
              {{ error }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import apiClient from "../axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const error = ref("");
    const loading = ref(false);
	const router = useRouter();

    const register = async () => {
      if (password.value !== confirmPassword.value) {
        error.value = "Passwords do not match";
        return;
      }

      loading.value = true;
      error.value = "";

      try {
        const response = await apiClient.post("/register", {
          name: name.value,
          email: email.value,
          password: password.value,
        });

        console.log(response.data);

        alert("Registration successful!");

        router.push("/");
      } catch (err) {
        error.value = err.response
          ? err.response.data.message
          : "Registration failed";
      } finally {
        loading.value = false;
      }
    };

    return {
      name,
      email,
      password,
      confirmPassword,
      error,
      loading,
      register,
    };
  },
};
</script>

<style scoped></style>
