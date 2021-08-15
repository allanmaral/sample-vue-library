<template>
  <div>
    <v-app>
      <v-main>
        <v-container>
          <sample-component></sample-component>
        </v-container>
        <v-container>Hello world</v-container>
        <v-container>
          <hc-btn color="primary">test</hc-btn>
          <hc-btn color="dark">test</hc-btn>
          <hc-btn color="link-blue">test</hc-btn>
          <hc-btn color="link-gray">test</hc-btn>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import {SampleComponent} from '@heart/ui'
import HcBtn from './components/hc-btn/HcBtn.vue'

export default defineComponent({
  name: 'App',
  components: {
    HcBtn,
    SampleComponent
  }
})
</script>

<style></style>
