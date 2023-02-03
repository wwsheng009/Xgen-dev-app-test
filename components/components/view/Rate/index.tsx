import { Component } from "@/types"
import { Rate, RateProps } from "antd"
import { useMemoizedFn } from 'ahooks'

interface IProps extends RateProps, Component.PropsViewComponent {
	__value: number
}

const Index = (props: IProps) => {
	const { __value, __bind, onSave } = props

	// if (!__value) return <span>-</span>
	const onChange = useMemoizedFn((v: number) => {
		onSave({ [__bind]: v })
	})
	return <Rate value={__value} onChange={onChange} ></Rate>
}

export default window.$app.memo(Index)
