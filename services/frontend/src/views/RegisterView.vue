<template>
  <section>
    <SnackBar
      :show="snackbarShow"
      :color="snackbarColor"
      :message="snackbarMessage"
      v-on:update="snackbarShow = $event" />
    <v-card class="elevation-12 w-auto h-auto">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Register</v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent="submit">
        <v-card-text>
          <v-text-field
            id="username"
            v-model="form.username"
            prepend-icon="person"
            name="username"
            label="username"
            type="text"></v-text-field>
          <v-text-field
            id="full_name"
            v-model="form.full_name"
            prepend-icon="person"
            name="full_name"
            label="Full Name"
            type="text"></v-text-field>
          <v-text-field
            id="password"
            prepend-icon="lock"
            v-model="form.password"
            name="password"
            label="Password"
            type="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            type="submit"
            block
            color="primary"
            variant="elevated">
            Register
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </section>
</template>

<script setup>
import SnackBar from '@/components/SnackBar.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const loading = ref(false);
const snackbarMessage = ref('');
const snackbarShow = ref(false);
const snackbarColor = ref('success');

const router = useRouter();
const store = useStore();

const form = ref({
  username: '',
  full_name: '',
  password: '',
});

const showSnackbar = () => {
  snackbarShow.value = true;
};

const submit = async () => {
  try {
    loading.value = true;
    const { success, data } = await store.dispatch('register', {
      ...form.value,
    });
    loading.value = false;
    if (success === false) {
      throw data;
    }

    router.push('/');
  } catch (error) {
    snackbarMessage.value = error || 'Unknown error';
    snackbarColor.value = 'error';
    showSnackbar();
  }
};
</script>
