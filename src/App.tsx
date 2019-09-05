import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout, Typography } from 'antd';

import { store } from './modules/redux';
import { Dictionaries, NoMatch, Dictionary } from './routes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Layout.Header>
          <Typography.Title>Dictionary Portal</Typography.Title>
        </Layout.Header>
        <Layout.Content>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Dictionaries} />
              <Route exact path="/dictionary/:id" component={Dictionary} />
              <Route component={NoMatch} />
            </Switch>
          </BrowserRouter>
        </Layout.Content>
      </Layout>
    </Provider>
  );
};

export default App;
