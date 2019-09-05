import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { store } from './modules/redux';
import { Dictionaries, NoMatch, Dictionary } from './routes';

import 'antd/dist/antd.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dictionaries} />
          <Route exact path="/dictionary/:id" component={Dictionary} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
