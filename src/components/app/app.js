import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { history } from '../../_helpers';
import { alertActions } from '../../_actions';
import { PrivateRoute } from '../../_components';
import { HomePage } from '../pages';
import { LoginPage } from '../pages';
import { RegisterPage } from '../pages';

import './app.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;
    alert.message &&
      notification.open({
        message: `alert ${alert.type}`,
        description: alert.message
      });
    return (
      <div className="jumbotron">
        <div className="container">
          <Router history={history}>
            <div>
              <PrivateRoute exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Redirect from="*" to="/" />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};
const connectedApp = connect(
  mapStateToProps,
  actionCreators
)(App);
export default connectedApp;
