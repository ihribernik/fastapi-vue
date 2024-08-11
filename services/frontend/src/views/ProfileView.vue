<template>
  <section>
    <SnackBar
      :show="snackbarShow"
      :color="snackbarColor"
      :message="snackbarMessage"
      v-on:update="snackbarShow = $event" />
    <v-card class="elevation-12 w-auto h-auto">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Profile</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form @submit.prevent="deleteAccount">
          <v-text-field
            v-model="form.username"
            prepend-icon="person"
            id="username"
            name="username"
            label="username"
            disabled
            type="text"></v-text-field>
          <v-text-field
            v-model="form.full_name"
            id="full_name"
            disabled
            prepend-icon="person"
            name="full_name"
            label="Full Name"
            type="text"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :loading="loading"
          @click="deleteAccount()"
          color="error"
          variant="elevated">
          Delete Account
        </v-btn>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script setup>
import SnackBar from '@/components/SnackBar.vue';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const loading = ref(false);

const snackbarMessage = ref('');
const snackbarShow = ref(false);
const snackbarColor = ref('success');

const store = useStore();
const router = useRouter();

const user = computed(() => store.getters.stateUser);

const form = ref({
  full_name: '',
  password: '',
});

const showSnackbar = () => {
  snackbarShow.value = true;
};

const deleteAccount = async () => {
  try {
    if (confirm('Are you sure you want to delete your account?')) {
      await store.dispatch('deleteUser', user.value.id);
      await store.dispatch('logOut');
      snackbarMessage.value =
        'User Correctly Deleted, redirecting to login in 5 seconds...';
      snackbarColor.value = 'success';
      showSnackbar();
      setTimeout(() => {
        router.push('/login');
      }, 5000);
    }
  } catch (error) {
    snackbarMessage.value = error || 'Unknown error';
    snackbarColor.value = 'error';
    showSnackbar();
  }
};

onMounted(async () => {
  await store.dispatch('viewMe');

  form.value.full_name = user.value.full_name;
  form.value.username = user.value.username;
});
</script>
