import { Rate } from "antd"

interface IProps {
	__value: number
}

const Index = (props: IProps) => {
      const { __value } = props
      
	if (!__value) return <span>-</span>

	return <Rate value = {__value} ></Rate>
}

export default window.$app.memo(Index)
