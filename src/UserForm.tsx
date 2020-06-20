import React, { Component } from 'react';
import { Form } from './antd';
import { Input } from 'antd'

interface Props {
    form: any
}
class UserForm extends Component<Props> {
    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { form: { getFieldsValue } } = this.props;
        const values = getFieldsValue()
        console.log(values, 'values');
    }
    render() {
        const { form: { getFieldDecorator } } = this.props;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label="username">
                    {
                        getFieldDecorator('username')(<Input />)
                    }
                </Form.Item>
                <Form.Item label="password">
                    {
                        getFieldDecorator('password')(<Input />)
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