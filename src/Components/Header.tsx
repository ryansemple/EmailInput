import React, { PureComponent } from 'react';

interface IHeaderProps {
    title: string
}

export default class Header extends PureComponent<IHeaderProps> 
{
    render = () => 
    <header className="App-header">
        <h1>{this.props.title}</h1>
    </header>
}