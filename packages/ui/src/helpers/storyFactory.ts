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
    args,
    argTypes,
    parameters: {
      docs: {
        description: {
          component: description,
        },
      },
    },
  }
}