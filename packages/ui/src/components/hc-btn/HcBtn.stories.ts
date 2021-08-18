import { storyFactory } from "../../helpers/storyFactory";

import { HcBtn } from '@heart/ui'

export default storyFactory({
  title: 'Components/HcBtn',
  component: HcBtn,
  description: 'This can be **markdown**!',
  args: {
    elevation: '0',
    color: 'primary'
  }
})

// create a base template to share
const Template = (_: any, { argTypes }: any) => ({
  components: { HcBtn },
  props: Object.keys(argTypes),
  template: '<hc-btn :elevation="elevation" :color="color">teste</v-btn>',
})

// now the stories, you need at least one
export const Default = Template.bind({})