<template>
  <section>
    <v-card class="elevation-12 w-auto h-auto">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent="submit" ref="form">
        <v-card-text>
          <v-text-field
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VForm } from 'vuetify/lib/components/index.mjs';
import { useStore } from 'vuex';

const loading = ref(false);
const form = ref(null);
const store = useStore();
const router = useRouter();

const submit = async () => {
  try {
    const { valid } = await form.value.validate();

    if (valid) {
      loading.value = true;
      const User = new FormData();
      User.append('username', form.value.username.value);
      User.append('password', form.value.password.value);
      const { success, data } = await store.dispatch('logIn', User);
      loading.value = false;
      if (!success) {
        throw data;
      }
      router.push('/dashboard');
    }
  } catch (error) {
    console.error({ error });
  }
};
</script>
