import React, { Component } from 'react';

export default function() {
    return function decorate(WrappedComponent: any){
        class ProxyComponent extends Component {
            render (){
                return <WrappedComponent />
            }
        }
        return ProxyComponent;
    }
}