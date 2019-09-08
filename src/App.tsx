import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { Layout, Typography } from 'antd';

import { store } from './modules/redux';
import { Dictionaries, NoMatch, Dictionary } from './routes';

import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Layout.Header className={styles.appHeader}>
            <Typography.Title>
              <NavLink to="/">Dictionary Management Portal</NavLink>
            </Typography.Title>
          </Layout.Header>
          <Layout.Content>
            <Switch>
              <Route exact path="/" component={Dictionaries} />
              <Route exact path="/dictionary/:id" component={Dictionary} />
              <Route component={NoMatch} />
            </Switch>
          </Layout.Content>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
