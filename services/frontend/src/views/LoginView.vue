<template>
  <section>
    <SnackBar
      :show="snackbarShow"
      :color="snackbarColor"
      :message="snackbarMessage"
      v-on:update="snackbarShow = $event" />

    <v-card class="elevation-12 w-auto h-auto">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent="submit" ref="form">
        <v-card-text>
          <v-text-field
            id="username"
            prepend-icon="person"
            name="username"
            label="username"
            type="text"></v-text-field>
          <v-text-field
            id="password"
            prepend-icon="lock"
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
            variant="elevated"
            >Login</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </section>
</template>

<script setup>
import SnackBar from '@/components/SnackBar.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VForm } from 'vuetify/lib/components/index.mjs';
import { useStore } from 'vuex';

const loading = ref(false);
const form = ref(null);

const snackbarMessage = ref('');
const snackbarShow = ref(false);
const snackbarColor = ref('success');

const store = useStore();
const router = useRouter();

const showSnackbar = () => {
  snackbarShow.value = true;
};

const submit = async () => {
  try {
    const { valid } = await form.value.validate();

    if (valid) {
      loading.value = true;
      const User = new FormData();
      User.append('username', form.value.username.value);
      User.append('password', form.value.password.value);
      const response = await store.dispatch('logIn', User);
      loading.value = false;
      if (response.success !== true) {
        throw response.data;
      }
      router.push('/');
    }
  } catch (error) {
    snackbarMessage.value = error || 'Unknown error';
    snackbarColor.value = 'error';
    showSnackbar();
  }
};
</script>
