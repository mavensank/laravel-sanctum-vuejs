<template>
  <v-container>
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

export default {
  setup() {
    const user = ref({});
    const error = ref('');

    const fetchUserProfile = async () => {
      try {
        const response = await apiClient.get('/user');
        user.value = response.data.user;
      } catch (err) {
        error.value = err.response ? err.response.data.message : 'Failed to fetch user data';
      }
    };

    onMounted(() => {
      fetchUserProfile();
    });

    return {
      user,
      error,
    };
  },
};
</script>

<style scoped>
</style>
