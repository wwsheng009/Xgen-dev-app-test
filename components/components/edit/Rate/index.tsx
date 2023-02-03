import { Rate, RateProps, Input } from 'antd'
import type { FormItemProps } from 'antd'
import { Item } from '@/components'
import react, { ChangeEventHandler } from 'react'

import { useMemoizedFn } from 'ahooks'

type FormType = 'view' | 'edit'
interface Props {
    __namespace: string
    __primary: string
    __type: FormType
    __bind: string
    __name: string
}
const { useState } = react
interface PropsEditComponent extends Props {
    itemProps?: FormItemProps
}
interface IProps extends RateProps, PropsEditComponent { }

interface ComponentProps {
    value?: number | undefined,
    onChange?: (value: number) => void | ChangeEventHandler<Element> | undefined
}
//自定义的Form 控件需要实现两个属性value,onChange事件
const MyFormComponent = ({ value = 0, onChange, ...rest_props }: ComponentProps) => {
    //维护组件状态
    const [inputValue, setInputValue] = useState(value);

    const onRateChange = useMemoizedFn(e => {
        setInputValue(e);
        if (onChange) {
            onChange(e);
        }
    });
    const onInputChange = useMemoizedFn(e => {

        setInputValue(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    });

    return (
        <>
            <Rate value={inputValue} onChange={onRateChange} {...rest_props}></Rate>
            <Input value={inputValue} onChange={onInputChange} {...rest_props} />
        </>
    );
};
const Index = (props: IProps) => {
    const { __bind, __name, itemProps, ...rest_props } = props

    return (
        <Item {...itemProps} {...{ __bind, __name }}>
            <MyFormComponent {...rest_props} />

        </Item>
    )
}

export default window.$app.memo(Index)
// <Rate  {...rest_props}></Rate>