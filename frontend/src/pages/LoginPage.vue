<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-title>
            <span class="text-h5">Login</span>
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="login">
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

              <v-btn type="submit" color="primary" class="mt-4" :loading="loading">
                Login
              </v-btn>
            </v-form>

            <v-alert
              v-if="error"
              type="error"
              dismissible
              v-model="showError"
              class="mt-3"
            >
              {{ error }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../axios';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const showError = ref(false);
    const loading = ref(false);
    const router = useRouter();

    const login = async () => {
      loading.value = true;
      error.value = '';
      showError.value = false;

      try {
        const response = await apiClient.post('/login', {
          email: email.value,
          password: password.value,
        });

        localStorage.setItem('authToken', response.data.token);

        router.push('/profile');
      } catch (err) {
        error.value = err.response ? err.response.data.message : 'Login failed';
        showError.value = true;
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      password,
      error,
      showError,
      loading,
      login,
    };
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
