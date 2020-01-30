import React, { PureComponent } from 'react';

interface IHeaderProps {
    title: string
}

export default class Header extends PureComponent<IHeaderProps> 
{
    render = () => 
    <header className="Header margin_bottom_40">
        <h1>{this.props.title}</h1>
    </header>
}