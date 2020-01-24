import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import { WithBudgetService } from '../hoc';
import CreateCategoryForm from '../CreateCategoryForm';
import { fetchBooks, сhooseCategory, categoryRemovedFromBudget } from '../../_actions';
import { compose } from '../../utils';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './categories-list.css';

const CategoriesList = ({ categories, categoryChoosed, сhooseCategory, categoryRemovedFromBudget }) => {
  return (
    <div>
      <CreateCategoryForm />
      <ul className="categories-list">
        {categories
          ? categories.map(category => {
              return (
                <li key={category.id} onClick={() => сhooseCategory(category.id)}>
                  <div className={`categories-list-item ${categoryChoosed === category.id ? 'is-active' : null}`}>
                    <h3 className="category-title">
                      {category.title}
                      <span className="category-total">${category.categoryTotal}</span>
                    </h3>
                    <div className="category-actions">
                      <Button
                        size="small"
                        className="btn-transparent"
                        onClick={e => {
                          e.stopPropagation();
                          return categoryRemovedFromBudget(category);
                        }}
                      >
                        <Icon type="delete" />
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};

class CategoriesListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { categories, loading, error, categoryChoosed, сhooseCategory, categoryRemovedFromBudget } = this.props;
    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return (
      <CategoriesList
        categories={categories}
        сhooseCategory={сhooseCategory}
        categoryChoosed={categoryChoosed}
        categoryRemovedFromBudget={categoryRemovedFromBudget}
      />
    );
  }
}

const mapStateToProps = ({ categoriesList: { categories, loading, error, categoryChoosed } }) => {
  return { categories, loading, error, categoryChoosed };
};

const mapDispatchToProps = (dispatch, { budgetService }) => {
  return bindActionCreators(
    {
      fetchBooks: fetchBooks(budgetService),
      сhooseCategory: сhooseCategory,
      categoryRemovedFromBudget: categoryRemovedFromBudget
    },
    dispatch
  );
};

export default compose(
  WithBudgetService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CategoriesListContainer);
