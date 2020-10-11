import * as React from 'react';

import NumberContext from './NumberContext';
import StringContext from './StringContext';

const Provider = ({ children }) => (
  <StringContext.Provider value={'asdf'}>
    <NumberContext.Provider value={123}>{children}</NumberContext.Provider>
  </StringContext.Provider>
);

const Consumer = () => {
  const number = React.useContext(NumberContext);
  const str = React.useContext(StringContext);

  return (
    <>
      <div>Number: {number}</div>
      <div>String: {str}</div>
    </>
  );
};

const App = () => {
  return (
    <Provider>
      <Consumer />
    </Provider>
  );
};

export default App;
