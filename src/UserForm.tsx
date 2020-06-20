import React, { Component } from 'react';
import { Input } from 'antd';
import { Form } from './antd';

interface Props {
    form: any
}
class UserForm extends Component<Props> {
    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // const { form: { getFieldsValue } } = this.props;
        // const values = getFieldsValue()
        // console.log(values, 'values');
    }
    render() {
        // const { form: { getFieldDecorator } } = this.props;
        return (
            <Form>
                <Form.Item label="username">
                    <Input />
                </Form.Item>
                <Form.Item label="password">
                    <Input />
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