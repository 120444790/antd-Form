import React, { Component } from 'react';
import { Form } from './antd';
import { Input } from 'antd'

interface Props {
    form: any
}
class UserForm extends Component<Props> {
    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { form: { validateFields } } = this.props;
        validateFields((err:any, value:any) => {
            // console.log(err, 'err');
            // console.log(value, 'value');
        })
        // const values = getFieldsValue()
        // console.log(values, 'values');
    }
    render() {
        const { form: { getFieldDecorator } } = this.props;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label="username">
                    {
                        getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your name',
                                },
                                {
                                    max: 6,
                                    message: 'max 6',
                                },
                                {
                                    min: 2,
                                    message: 'min 2',
                                }
                            ]
                        })(<Input />)
                    }
                </Form.Item>
                <Form.Item label="password">
                    {
                        getFieldDecorator('password', {
                            rules: [
                              {
                                required: true,
                                message: 'Please input your password',
                              },
                            ],
                          })(<Input />)
                    }
                </Form.Item>
                <Form.Item>
                    <button>提交</button>
                </Form.Item>
            </Form>
        );
    }
}

const wrappedUserForm = Form.create()(UserForm);
export default wrappedUserForm;