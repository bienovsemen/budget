
const booksRequested = () => {
  return {
    type: 'FETCH_CATEGORIES_REQUEST'
  };
};
// CATEGORIES
const booksLoaded = (categories) => {
  return {
    type: 'FETCH_CATEGORIES_SUCCESS',
    payload: categories
  };
};

const booksError = (error) => {
  return {
    type: 'FETCH_CATEGORIES_FAILURE',
    payload: error
  };
};

export const сhooseCategory = (categoryId) => {
  return {
    type: 'CATEGORY_CHOOSED',
    payload: categoryId
  };
};
export const categoryAddedToBudget = (category) => {
  return {
    type: 'CATEGORY_ADDED_TO_BUDGET',
    payload: category
  };
};
export const categoryRemovedFromBudget = (category) => {
  console.log(category);
  return {
    type: 'CATEGORY_REMOVED_FROM_BUDGET',
    payload: category
  };
};
export const itemRemoveFromCategory = (item) => {
  console.log(item);
  return {
    type: 'ITEM_REMOVE_FROM_CATEGORY',
    payload: item
  };
};

export const itemAddToCategory = (item) => {
  return {
    type: 'ITEM_ADD_TO_CATEGORY',
    payload: item
  };
};

const fetchBooks = (budgetService) => () => (dispatch) => {
  dispatch(booksRequested());
  budgetService.getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err)));
};

export {
  fetchBooks
};
