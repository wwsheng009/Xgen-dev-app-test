import { Input } from 'antd'
import type { FormItemProps } from 'antd'
import { Item } from '@/components'
// import { getLocale } from '@umijs/max'
import type { InputProps } from 'antd'
// import type { Component } from '@/types'
type FormType = 'view' | 'edit'
interface Props {
    __namespace: string
    __primary: string
    __type: FormType
    __bind: string
    __name: string
}

interface PropsEditComponent extends Props {
    itemProps?: FormItemProps
}
interface IProps extends InputProps, PropsEditComponent {}

const Index = (props: IProps) => {
	const { __bind, __name, itemProps, ...rest_props } = props
	const is_cn = true

	return (
		<Item {...itemProps} {...{ __bind, __name }}>
			<Input placeholder={`${is_cn ? '请输入' : 'Please input '}${__name}`} {...rest_props}></Input>
		</Item>
	)
}

export default Index
