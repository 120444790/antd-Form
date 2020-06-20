import React, { Component } from 'react';

interface Props {

}
interface ObjectsType {
    [propName: string]: any
}
interface State {
    values: ObjectsType
}

export default function () {
    return function decorate(WrappedComponent: any) {
        class ProxyComponent extends Component<Props, State> {
            state = {
                values: {}
            }
            handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
                let value = event.target.value;
                this.setState({
                    values: { ...this.state.values, [name]: value }
                })
            }
            getFieldDecorator = (name: string) => {
                return (fieldElement: any) => {
                    let values: ObjectsType = this.state.values;
                    let props = {
                        value: values[name] || '',
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event, name)
                    };
                    // fieldElement 是组件的实例 <Input />
                    //  <fieldElement /> 不行
                    return React.cloneElement(fieldElement, props);
                }
            }
            getFieldsValue = () => {
                return this.state.values;
            }
            render() {
                let props = {
                    form: {
                        getFieldDecorator: this.getFieldDecorator,
                        getFieldsValue: this.getFieldsValue
                    }
                };
                return <WrappedComponent {...props} />
            }
        }
        return ProxyComponent;
    }
}