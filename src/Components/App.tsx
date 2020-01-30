import EmailInput from '../Containers/EmailInput';
import Header from './Header';
import React, { PureComponent } from 'react';

export default class App extends PureComponent 
{
  render = () => 
    <div>
      <Header title={"📧 Email input challenge"} />
      <main>
        <EmailInput />
        </main>   
    </div>
}