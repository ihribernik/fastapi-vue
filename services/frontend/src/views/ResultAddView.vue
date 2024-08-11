<template>
  <div>
    <section>
      <SnackBar
        :show="snackbarShow"
        :color="snackbarColor"
        :message="snackbarMessage"
        v-on:update="snackbarShow = $event" />

      <v-form @submit.prevent="submit">
        <h1>Subir nuevo resultado</h1>
        <v-text-field
          name="nombrePaciente"
          v-model="form.patient_name"
          prepend-icon="mdi-account-injury"
          label="Nombre de paciente"
          type="text"></v-text-field>

        <v-select
          name="tipoResultado"
          label="Tipo de Resultado"
          v-model="form.result_type"
          prepend-icon="mdi-clipboard-pulse-outline"
          :items="[
            'Positivo',
            'Negativo',
            'Insuficiente',
            'Cancelado',
          ]"></v-select>

        <v-text-field
          name="gen"
          label="Gen"
          type="text"
          v-model="form.gen_type"
          prepend-icon="mdi-dna"></v-text-field>
        <v-spacer></v-spacer>

        <v-btn type="submit" class="btn btn-primary">Submit</v-btn>
      </v-form>
    </section>
  </div>
</template>

<script setup>
import SnackBar from '@/components/SnackBar.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const loading = ref(false);
const snackbarMessage = ref('');
const snackbarShow = ref(false);
const snackbarColor = ref('success');

const store = useStore();

const showSnackbar = () => {
  snackbarShow.value = true;
};

const form = ref({
  patient_name: '',
  result_type: '',
  gen_type: '',
});

const submit = async () => {
  try {
    loading.value = true;
    const { success, data } = await store.dispatch('createResult', {
      ...form.value,
    });
    if (success === false) {
      throw data;
    }
    loading.value = false;
    snackbarMessage.value = 'Result created correctly';
    snackbarColor.value = 'success';
    showSnackbar();
  } catch (error) {
    snackbarMessage.value = error || 'Unknown error';
    snackbarColor.value = 'error';
    showSnackbar();
  }
};
</script>
