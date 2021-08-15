import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import vue from 'rollup-plugin-vue';
import ttypescript from 'ttypescript';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import packageJson from './package.json';
const projectRoot = path.resolve(__dirname);

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs.readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

// Extract babel preset-env config, to combine with esbrowserslist
const babelPresetEnvConfig = require('./babel.config')
  .presets.filter((entry) => entry[0] === '@babel/preset-env')[0][1];

const argv = minimist(process.argv.slice(2));

const baseConfig = {
  input: 'src/index.ts',
  plugins: {
    preVue: [
      alias({
        entries: [
          {
            find: '@',
            replacement: `${path.resolve(projectRoot, 'src')}`,
          },
        ],
      }),
    ],
    replace: {
      preventAssignment: false,
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    vue: {
      css: true,
      template: {
        isProduction: true,
      },
    },
    postVue: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      }),
      commonjs(),
    ],
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled',
    },
  },
}

const buildFormats = [];
if (!argv.format || argv.format === 'es') {
  const esConfig = {
    ...baseConfig,
    input: 'src/index.ts',
    output: {
      file: packageJson.module,
      format: 'esm',
      exports: 'named',
      sourcemap: true
    },
    plugins: [
      peerDepsExternal(),
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      typescript({
        typescript: ttypescript,
        useTsconfigDeclarationDir: true,
        emitDeclarationOnly: true,
      }),
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          [
            '@babel/preset-env',
            {
              ...babelPresetEnvConfig,
              targets: esbrowserslist,
            },
          ],
        ],
      }),
    ]
  };
  buildFormats.push(esConfig)
}

if (!argv.format || argv.format === 'cjs') {
  const cjsConfig = {
    ...baseConfig,
    output: {
      compact: true,
      file: packageJson.main,
      format: 'cjs',
      name: packageJson.name,
      exports: 'auto',
    },
    plugins: [
      peerDepsExternal(),
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue({
        ...baseConfig.plugins.vue,
        template: {
          ...baseConfig.plugins.vue.template,
          optimizeSSR: true,
        },
      }),
      ...baseConfig.plugins.postVue,
      typescript({
        typescript: ttypescript,
        useTsconfigDeclarationDir: true,
        emitDeclarationOnly: true,
      }),
      babel(baseConfig.plugins.babel),
    ],
  };
  buildFormats.push(cjsConfig);
}

export default buildFormats;

// export default {
//   input: 'src/index.ts',
//   output: [
//     {
//       format: 'cjs',
//       file: packageJson.main,
//       sourcemap: true
//     },
//     {
//       file: packageJson.module,
//       format: 'esm',
//       sourcemap: true,
//       exports: 'named'
//     },
//   ],
//   plugins: [
//     peerDepsExternal(),
//     replace({ 
//       preventAssignment: false,
//       'process.env.NODE_ENV': JSON.stringify('production'),
//     }),
//     alias({
//       entries: [
//         {
//           find: '@',
//           replacement: `${path.resolve(projectRoot, 'src')}`,
//         },
//       ],
//     }),
//     vue({
//       css: true,
//       template: {
//         isProduction: true,
//       },
//     }),
//     resolve({
//       extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
//     }),
//     commonjs(),
//     typescript({
//       typescript: ttypescript,
//       useTsconfigDeclarationDir: true,
//       emitDeclarationOnly: true,
//     }),
//     babel({
//       exclude: 'node_modules/**',
//       extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
//       babelHelpers: 'bundled',
//       presets: [
//         [
//           '@babel/preset-env',
//           {
//             ...babelPresetEnvConfig,
//             targets: esbrowserslist,
//           },
//         ],
//       ],
//     }),
//   ]
// };