<template>
  <v-btn :elevation="elevation" v-bind="$attrs" v-on="$listeners">
    <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
    <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData"><slot :name="name" v-bind="slotData" /></template>
  </v-btn>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue-demi'
export default defineComponent({
  name: 'BcBtn',
  props: {
    elevation: {
      type: String,
      default: "0"
    }
  },
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>

<style lang="scss" scoped>
.v-btn:hover::before {
  opacity: 0 !important;
}

.v-btn.primary {
  color: #fff;
  background: linear-gradient(to left, #28B6E7, #22D1D5);

  &:hover {
    background: #21A0E2;
  }
}

.v-btn.dark {
  color: #21A0E2;
  background: #262E39;

  &:hover {
    color: #9097A7;
  }
}

.v-btn.link-blue {
  background: transparent;
  color: #21A0E2;

  &:hover {
    color: #9097A7;
  }
}

.v-btn.link-gray {
  background: transparent;
  color: #9097A7;

  &:hover {
    color: #21A0E2;
  }
}
</style>
