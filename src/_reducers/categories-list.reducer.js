const updateItems = (items, item, idx, del) => {
  if (del) {
    return [...items.slice(0, idx), ...items.slice(idx + 1)];
  }

  if (idx === -1) {
    return [...items, item];
  }

  return [...items.slice(0, idx), item, ...items.slice(idx + 1)];
};
// categoryItem
const createItem = item => {
  const { categoryId, title, amount, type } = item;
  return {
    id: title,
    categoryId,
    title,
    amount,
    type
  };
};

const updateItem = (state, item, del) => {
  const {
    categoriesList: { categories }
  } = state;
  const category = categories.find(({ id }) => id === item.categoryId);
  const categoryIndex = categories.findIndex(({ id }) => id === item.categoryId);
  const categoryTotal = category.categoryTotal;

  const itemIndex = category.items.findIndex(({ id }) => id === item.title);
  const newItem = del ? item : createItem(item);
  let updatedCategoryTotal;
  if (del) {
    updatedCategoryTotal = newItem.type === 'dec' ? categoryTotal + newItem.amount : categoryTotal - newItem.amount;
  } else {
    updatedCategoryTotal = newItem.type === 'dec' ? categoryTotal - newItem.amount : categoryTotal + newItem.amount;
  }
  const newcategory = Object.assign(
    {},
    category,
    { categoryTotal: updatedCategoryTotal },
    { items: updateItems(category.items, newItem, itemIndex, del) }
  );
  const categoriesNew = updateItems(categories, newcategory, categoryIndex);
  return categoriesNew;
};

// category
const updateCategory = (state, item, del) => {
  const {
    categoriesList: { categories }
  } = state;
  let categoriesNew, categoryIndex, newcategory;
  if (del) {
    newcategory = {
      id: item.id,
      title: item.title,
      items: [],
      categoryTotal: 0
    };
    categoryIndex = categories.findIndex(({ id }) => id === item.id);
  } else {
    categoryIndex = -1;
    newcategory = {
      id: item.id,
      title: item.title,
      items: [],
      categoryTotal: 0
    };
  }
  categoriesNew = updateItems(categories, newcategory, categoryIndex, del);
  return categoriesNew;
};
const initialState = {
  categories: [],
  loading: true,
  error: null,
  categoryChoosed: 1
};
export const categoriesList = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES_REQUEST':
      return {
        categories: [],
        loading: true,
        error: null,
        categoryChoosed: 1
      };

    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        categories: action.payload,
        loading: false,
        error: null,
        categoryChoosed: 1
      };

    case 'FETCH_CATEGORIES_FAILURE':
      return {
        categories: [],
        loading: false,
        error: action.payload,
        categoryChoosed: 1
      };

    case 'CATEGORY_CHOOSED':
      return Object.assign({}, state.categoriesList, {
        categoryChoosed: action.payload
      });

    case 'CATEGORY_ADDED_TO_BUDGET':
      return Object.assign({}, state.categoriesList, {
        categories: updateCategory(state, action.payload)
      });

    case 'CATEGORY_REMOVED_FROM_BUDGET':
      return Object.assign({}, state.categoriesList, {
        categories: updateCategory(state, action.payload, 'del')
      });

    case 'ITEM_ADD_TO_CATEGORY':
      return Object.assign({}, state.categoriesList, {
        categories: updateItem(state, action.payload)
      });

    case 'ITEM_REMOVE_FROM_CATEGORY':
      return Object.assign({}, state.categoriesList, {
        categories: updateItem(state, action.payload, 'del')
      });

    default:
      return state;
  }
};
