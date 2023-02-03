import { defineConfig } from 'rollup'

import { nodeResolve } from '@rollup/plugin-node-resolve'
import glob from 'glob';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
export const plugins = [nodeResolve()]


export default defineConfig({
	input: Object.fromEntries(
		glob.sync('components/components/**/*.ts*').map(file => [
			// This remove `src/` as well as the file extension from each
			// file, so e.g. src/nested/foo.js becomes nested/foo
			path.relative(
				'components/components',
				file.slice(0, file.length - path.extname(file).length)
			),
			// This expands the relative paths to absolute paths, so e.g.
			// src/nested/foo becomes /project/src/nested/foo.js
			fileURLToPath(new URL(file, import.meta.url))
		])
	),
	output: {
		dir: 'public/components',
		preserveModules: true,
		format: 'systemjs'
	},
	external: ['antd','react', 'react-dom', 'react/jsx-runtime','ahooks'],

	// When using tsyringe, this item needs to be set
	context: 'false'
})
