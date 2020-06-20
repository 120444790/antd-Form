import React, { Component } from 'react';

interface Props {
    label?: string
}
class FormItem extends Component<Props> {
    render() {
        const { label, children } = this.props;
        return (
            <div>
                {label && <label>{label}</label>}
                {children}
            </div>
        );
    }
}

export default FormItem;