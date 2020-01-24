import { combineReducers } from 'redux';
import { categoriesList } from './categories-list.reducer';
import { registration } from './registration.reducer';
import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  categoriesList,
  authentication,
  registration,
  users,
  alert
});

export default rootReducer;
