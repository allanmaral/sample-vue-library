export interface StoreFactoryOptions {
  title: string;
  description: string;
  component: any;
  args?: { [key: string]: any };
  argTypes?: { [key: string]: any };
}

// Returns a function to generate stories
export const storyFactory = (options: StoreFactoryOptions) => {
  const { title, component, args = {}, argTypes = {}, description } = options
  return {
    title,
    component,
    // component-level default args to the component being tested
    // you could add other app-level options here, too!
    args: {
      dark: true,
      ...args,
    },
    argTypes: {
      locale: {
        defaultValue: 'en',
        control: {
          type: 'inline-radio',
          options: { English: 'en', 'Español': 'es' },
        },
      },
      ...argTypes
    },
    parameters: {
      docs: {
        description: {
          component: description,
        },
      },
    },
  }
}