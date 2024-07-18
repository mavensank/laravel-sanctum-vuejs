<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-btn @click="logout" color="primary">Logout</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <span class="text-h5">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Email</v-list-item-title>
                  <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Name</v-list-item-title>
                  <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-alert v-if="error" type="error" dismissible>
              {{ error }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import apiClient from '../axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const user = ref({});
    const error = ref('');
    const router = useRouter();
    const store = useStore();

    const fetchUserProfile = async () => {
      try {
        const response = await apiClient.get('/user');
        user.value = response.data.user;
      } catch (err) {
        error.value = err.response ? err.response.data.message : 'Failed to fetch user data';
      }
    };

    const logout = async () => {
      try {
        await apiClient.post('/logout');
        store.commit('clearAuthToken');
        router.push('/');
      } catch (error) {
        console.error('Logout failed:', error.response?.data?.message || error.message);
      }
    }

    onMounted(() => {
      fetchUserProfile();
    });

    return {
      user,
      error,
      logout
    };
  },
};
</script>

<style scoped></style>
