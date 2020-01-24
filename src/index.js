import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import BudgetService from './_services/BudgetService';
import { BudgetServiceProvider } from './components/BudgetServiceContext';

import 'antd/dist/antd.css';

import store from './store';

const budgetService = new BudgetService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <BudgetServiceProvider value={budgetService}>
        <Router>
          <App />
        </Router>
      </BudgetServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);
