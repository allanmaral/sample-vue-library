<template>
  <div>
    <v-app>
      <v-main>
        <v-container>Hello world</v-container>
        <v-container>
          <bc-btn color="primary">test</bc-btn>
          <bc-btn color="dark">test</bc-btn>
          <bc-btn color="link-blue">test</bc-btn>
          <bc-btn color="link-gray">test</bc-btn>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import BcBtn from './components/hc-btn/HcBtn.vue'

export default defineComponent({
  name: 'App',
  components: {
    BcBtn
  }
})
</script>

<style></style>
