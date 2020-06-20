import * as React from 'react';
import FormItem from "./FormItem";
import create from "./create";

export default class From extends React.Component {
    static Item = FormItem;
    static create = create;
    render() {
        return (
            <form {...this.props} />
        )
    }
}