// import type { GlobalModel } from '@/context/app'

declare global {
	interface Window {
		$global: any//由于是插件，这里省略类型检查
	}
}
//让文件变成外部模块，要不然会报错
export {}
