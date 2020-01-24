import React from 'react';

const {
  Provider: BudgetServiceProvider,
  Consumer: BudgetServiceConsumer
} = React.createContext();

export {
  BudgetServiceProvider,
  BudgetServiceConsumer
};
