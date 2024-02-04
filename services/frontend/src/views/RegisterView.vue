<template>
  <section>
    <v-card class="elevation-12 w-auto h-auto">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Register</v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent="submit" ref="form">
        <v-card-text>
          <v-text-field
            prepend-icon="person"
            name="username"
            label="username"
            type="text"></v-text-field>
          <v-text-field
            id="full_name"
            prepend-icon="person"
            name="full_name"
            label="Full Name"
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
            variant="elevated">
            Register
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

// eslint-disable-next-line
const name = 'YourComponentName';

const loading = ref(false);

const router = useRouter();
const store = useStore();

const form = ref({
  username: '',
  full_name: '',
  password: '',
});

const submit = async () => {
  try {
    await store.dispatch('register', form.value);
    router.push('/dashboard');
  } catch (error) {
    console.log({ error });
    throw 'Username already exists. Please try again.';
  }
};
</script>
