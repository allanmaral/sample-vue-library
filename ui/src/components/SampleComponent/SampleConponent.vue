<template>
  <div class="sample-component-container">
    <h2>"headingText"</h2>
    <h3>"bodyText"</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SampleComponent extends Vue {}
</script>

<style scoped>
.sample-component-container {
  padding: 40px;
  background-color: black;
  color: white;
}
</style>