import EmailInput from './EmailInput';
import Header from './Header';
import React from 'react';

const App = () => {
  return (
    <div>
      <Header title={"📧 Email input challenge"} />
      <main>
        <EmailInput />
      </main>   
    </div>   
  )
}

export default App;