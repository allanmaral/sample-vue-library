const path = require('path')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  // add this function to tweak the webpack config
  webpackFinal: async (config, { configType }) => {
    // so I can import { storyFactory } from '~storybook/util/helpers'
    config.resolve.alias['~storybook'] = path.resolve(__dirname)
    // the @ alias points to the `src/` directory, a common alias
    // used in the Vue community
    config.resolve.alias['@'] = path.resolve(__dirname, '..', 'src')

    // THIS is the tricky stuff!
    config.module.rules.push({
      test: /.(scss|sass)$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            additionalData: "@import '@/sass/variables.sass'",
            sassOptions: {
              indentedSyntax: true,
            },
          },
        },
      ],
      // include: path.resolve(__dirname, '..'),
    })

    // return the updated Storybook configuration
    return config
  },
}