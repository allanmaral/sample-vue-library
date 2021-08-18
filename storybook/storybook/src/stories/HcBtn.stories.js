import { storyFactory } from "../../.storybook/util/helpers";

import { VBtn } from "vuetify/lib";

export default storyFactory({
  title: 'Components/HcBtn',
  component: VBtn,
  description: 'This can be **markdown**!',
  args: {
    elevation: '0',
    color: 'primary'
  }
})

// create a base template to share
const Template = (args, { argTypes }) => ({
  components: { VBtn },
  props: Object.keys(argTypes),
  template: '<v-btn :elevation="elevation" :color="color">teste</v-btn>',
})

// now the stories, you need at least one
export const Default = Template.bind({})