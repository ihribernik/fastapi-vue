<template>
  <v-snackbar
    transition="true"
    timeout="2000"
    v-model="show2"
    :color="color"
    absolute
    top
    outlined
    right>
    <strong v-if="typeof message === 'string'">
      {{ message }}
    </strong>
    <strong v-else>
      <p v-for="(error, i) in message" :key="i">
        {{ error.loc[1] }} - {{ error.msg }}
      </p>
    </strong>
    <v-btn color="red" text @click="show2 = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    show: Boolean,
    color: String,
    message: [String, Array],
  },
  computed: {
    show2: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit('update', value);
      },
    },
  },
};
</script>
