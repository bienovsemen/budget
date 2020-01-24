import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import Spinner from '../spinner';

import { itemRemoveFromCategory } from '../../_actions';

import './categories-info-table.css';
const CategoriesInfoTable = ({ category, onDelete }) => {
  const renderRow = (item, idx) => {
    const { id, title, amount, type } = item;
    return (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>{title}</td>
        <td>
          $ {type === 'dec' ? '-' : null}
          {amount}
        </td>
        <td>
          <Button size="small" className="btn-transparent" onClick={() => onDelete(item)}>
            <Icon type="delete" />
          </Button>
        </td>
      </tr>
    );
  };
  return (
    <div className="categories-info-table">
      {category ? (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>{category ? category.items.map(renderRow) : null}</tbody>
          </table>
          <div className="total">Total: ${category && category.categoryTotal}</div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const mapStateToProps = ({ categoriesList: { categories, categoryChoosed } }) => {
  const category = categories.filter(i => i.id === categoryChoosed);
  return {
    category: category[0]
  };
};

const mapDispatchToProps = {
  onDelete: itemRemoveFromCategory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesInfoTable);
