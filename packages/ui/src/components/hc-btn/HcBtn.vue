<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { VBtn } from 'vuetify/lib'
export default defineComponent({
  name: 'HcBtn',
  extends: VBtn,
  props: {
    elevation: {
      type: String,
      default: "0"
    }
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
