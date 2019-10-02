import { Config } from 'bili';
import path from 'path';

const config: Config = {
  plugins: {
    typescript2: {
      tsconfigOverride: {
        include: ['src'],
      },
      tsconfig: path.resolve(__dirname, '../../tsconfig.json')
    },
    terser: {
      keep_classnames: true,
    }
  },
  input: 'lib/core.ts',
  output: {
    format: ['esm', 'cjs'],
    extractCSS: false,
    moduleName: 'Core',
  }
};

export default config;
