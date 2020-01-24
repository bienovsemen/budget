import React from 'react';
import { BudgetServiceConsumer } from '../BudgetServiceContext';

const WithBudgetService = () => (Wrapped) => {

  return (props) => {
    return (
      <BudgetServiceConsumer>
        {
          (budgetService) => {
            return (<Wrapped {...props}
                     budgetService={budgetService}/>);
          }
        }
      </BudgetServiceConsumer>
    );
  }
};

export default WithBudgetService;
