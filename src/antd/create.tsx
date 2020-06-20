import React, { Component } from 'react';

interface Props {

}
interface ObjectsType {
    [propName: string]: any
}
interface State {
    values: ObjectsType,
    errors: ObjectsType,
}
type Callback = (a: any, b?: any) => void;
export default function () {
    return function decorate(WrappedComponent: any) {
        class ProxyComponent extends Component<Props, State> {
            state = {
                values: {},
                errors: {}
            }
            rules: ObjectsType = {}
            validateFields = (fileds: Array<string> | Callback, callback?: Callback) => {
                if (typeof fileds === 'function') {
                    callback = fileds;
                    fileds = Object.keys(this.rules);  // {username: [{ required: true, message: 'Please input your Password!' }, {min: 5, , message: 'min 5'}]}
                }
                let errors: ObjectsType = this.state.errors;
                // console.log(errors, 'errors');
                // console.log(fileds, 'fileds');
                // console.log(this.rules, 'rules');
                fileds.forEach((filed: string) => {
                    let rules = this.rules[filed];
                    if (rules && rules.length > 0) {
                        let values: ObjectsType = this.state.values;
                        let value: any = values[filed];
                        const filderErrors = rules.map((rule: ObjectsType) => {
                            if ((rule.required && !value) || (rule.min && value && value.length < rule.min) || (rule.max && value && value.length > rule.max)) {
                                return {
                                    filed,
                                    message: rule.message
                                }
                            }
                        }).filter((item: any) => item);
                        if (filderErrors.length > 0) {
                            errors[filed] = { error: filderErrors }
                        } else {
                            delete errors[filed]
                        }
                    }
                    let error = Object.keys(errors).length > 0 ? errors : null
                    this.setState({
                        errors
                    }, () => {
                        callback && (callback as Callback)(error, this.state.values)
                    })
                })
            }
            handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
                let value = event.target.value;
                this.setState({
                    values: { ...this.state.values, [name]: value }
                }, () => this.validateFields([name]))
            }
            getFieldDecorator = (name: string, options?: any) => {
                if (options.rules) {
                    this.rules[name] = options.rules;
                }
                return (fieldElement: any) => {
                    let values: ObjectsType = this.state.values;
                    let props = {
                        value: values[name] || '',
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event, name)
                    };
                    const inputElemnt = React.cloneElement(fieldElement, props)
                    // fieldElement 是组件的实例 <Input />
                    //  <fieldElement /> 不行
                    // console.log(this.state.errors, 'this.state.errors');
                    let errors: ObjectsType = this.state.errors;
                    let fieldErrors = errors[name];
                    let message = [];
                    // console.log(fieldErrors, 'fieldErrors');
                    if (fieldErrors && fieldErrors.error.length > 0) {
                        message = fieldErrors.error.map((item: any) => {
                            return item
                        }).map((item: any, index: number) => {
                            return <p key={index}>{item.message}</p>
                        })
                    }
                    return (
                        <div>
                            {inputElemnt}
                            {message.length > 0 && message}
                        </div>
                    );
                }
            }
            getFieldsValue = () => {
                return this.state.values;
            }

            render() {
                let props = {
                    form: {
                        getFieldDecorator: this.getFieldDecorator,
                        getFieldsValue: this.getFieldsValue,
                        validateFields: this.validateFields
                    }
                };
                return <WrappedComponent {...props} />
            }
        }
        return ProxyComponent;
    }
}