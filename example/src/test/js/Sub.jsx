import React from 'react';

export default class Sub extends React.Component {
    constructor( props ) {
        super( props );
    }
    render () {
        const { text, num } = this.props;
        return (
            <div>
                <h1>后加载内容</h1>
                <p>{text}: {num}</p>
            </div>
        );
    }
}